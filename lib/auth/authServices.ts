// authServices.ts
'use server'
import bcrypt from 'bcryptjs'
import type { LoginState, RegisterState } from './authTypes'
import { loginSchema, registerSchema } from './authSchemas'
import { sanitizeEmailPasswordName, saveVerificationToken } from './authHelpers'
import { encrypt, setSession } from './session'
import { hashPassword } from '../utils/crypto'
import { findUserByEmail, insertUser } from './authRepository'

const SALT_ROUNDS = 10

export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const body = Object.fromEntries(formData) as {
    email: string
    password: string
  }
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { email, password } = result.data
  const user = await findUserByEmail(email)

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return {
      errors: { email: ['Email ou palavra-passe inválidos'], password: [] },
      success: false,
    }
  }

  const token = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified ?? false, // ✅ adiciona este campo
  })

  await setSession(token)

  return { errors: {}, success: true, userId: user.id }
}

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const body = Object.fromEntries(formData) as {
    email: string
    password: string
    name?: string
  }

  const result = registerSchema.safeParse(body)
  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { sanitizedEmail, sanitizedPassword, sanitizedName } =
    sanitizeEmailPasswordName(
      result.data.email,
      result.data.password,
      result.data.name
    )

  const existing = await findUserByEmail(sanitizedEmail)
  if (existing) {
    return {
      errors: { email: ['Este email já está registado'], password: [] },
      success: false,
    }
  }

  const hashed = await hashPassword(sanitizedPassword, SALT_ROUNDS)
  const newUserId = await insertUser(sanitizedEmail, hashed, sanitizedName)

  // 🚀 Envia email de verificação logo após o registo
  await saveVerificationToken(newUserId, sanitizedEmail, sanitizedName)

  // Cria sessão, se quiseres manter login imediato
  const token = await encrypt({
    userId: newUserId,
    email: sanitizedEmail,
    name: sanitizedName,
    emailVerified: false, // 👈 inicia como não verificado
  })
  await setSession(token)

  return { errors: {}, success: true, userId: newUserId }
}
