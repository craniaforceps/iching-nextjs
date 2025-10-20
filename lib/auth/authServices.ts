'use server'

import bcrypt from 'bcryptjs'
import { loginSchema, registerSchema } from '@/lib/auth/authSchemas'
import { findUserByEmail, insertUser } from './authRepository'
import { sanitizeEmailAndPassword, checkIfEmailExists } from './authHelpers'
import { encrypt, setSession } from '@/lib/auth/session'
import type { LoginState, RegisterState } from './types'
import { hashPassword } from '../utils/crypto'

const SALT_ROUNDS = 10

export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const entries = Object.fromEntries(formData)
  const result = loginSchema.safeParse(entries)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { email, password } = result.data
  const user = findUserByEmail(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: { email: ['Email ou palavra-passe inválidos'], password: [] },
      success: false,
    }
  }

  const token = await encrypt({ userId: user.id, email: user.email })
  await setSession(token)

  return { errors: {}, success: true, userId: user.id }
}

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const entries = Object.fromEntries(formData)
  const result = registerSchema.safeParse(entries)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { email, password } = result.data
  const { sanitizedEmail, sanitizedPassword } = sanitizeEmailAndPassword(
    email,
    password
  )

  const emailExists = await checkIfEmailExists(sanitizedEmail)
  if (emailExists) {
    return {
      errors: { email: ['Este email já está registado'], password: [] },
      success: false,
    }
  }

  const hashed = await hashPassword(sanitizedPassword, SALT_ROUNDS)
  const resultInsert = await insertUser(sanitizedEmail, hashed)
  const newUserId = Number(resultInsert.lastInsertRowid)

  const token = await encrypt({ userId: newUserId, email: sanitizedEmail })
  await setSession(token)

  return { errors: {}, success: true, userId: newUserId }
}
