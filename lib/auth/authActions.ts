'use server'

import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import type { LoginState, User, RegisterState } from '@/lib/auth/types'
import { loginSchema, registerSchema } from '@/lib/auth/authSchemas'
import { checkIfEmailExists, sanitizeEmailAndPassword } from './authHelpers'
import { encrypt, setSession } from '@/lib/auth/session'
import { hashPassword } from '../utils/crypto'

// Número de rondas para bcrypt
const SALT_ROUNDS = 10

export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const entries = Object.fromEntries(formData)
  const result = loginSchema.safeParse(entries)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return {
      errors: {
        email: fieldErrors.email ?? [],
        password: fieldErrors.password ?? [],
      },
      success: false,
    }
  }

  const { email, password } = result.data

  const user = db
    .prepare('SELECT id, email, password FROM users WHERE email = ?')
    .get(email) as User | undefined

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ['Email ou palavra-passe inválidos'],
        password: [],
      },
      success: false,
    }
  }

  // ✅ Guarda email no token
  const token = await encrypt({ userId: user.id, email: user.email })
  await setSession(token)

  return { errors: {}, success: true, userId: user.id }
}

export async function registerUser(formData: FormData): Promise<RegisterState> {
  const data = Object.fromEntries(formData) as {
    email?: string
    password?: string
  }

  if (!data.email || !data.password) {
    return {
      errors: {
        email: data.email ? [] : ['Email é obrigatório'],
        password: data.password ? [] : ['Password é obrigatória'],
      },
      success: false,
    }
  }

  const validated = registerSchema.safeParse(data)
  if (!validated.success) {
    const { fieldErrors } = validated.error.flatten()
    return {
      errors: {
        email: fieldErrors.email ?? [],
        password: fieldErrors.password ?? [],
      },
      success: false,
    }
  }

  const cleanEmail = validated.data.email
  const cleanPassword = validated.data.password

  sanitizeEmailAndPassword(cleanEmail, cleanPassword)
  checkIfEmailExists(cleanEmail)

  const hashed = await hashPassword(cleanPassword, SALT_ROUNDS)
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(cleanEmail, hashed)
  const newUserId = Number(result.lastInsertRowid)

  // ✅ Guarda email no token
  const token = await encrypt({ userId: newUserId, email: cleanEmail })
  await setSession(token)

  return { errors: {}, success: true }
}
