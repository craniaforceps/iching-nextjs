'use server'

import { treeifyError } from 'zod'
import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import type { LoginState, User, RegisterData } from '@/lib/types/authTypes'
import { loginSchema } from '@/lib/schemas/authSchemas'
import { validateRegister } from './validation'
import {
  ensureEmailNotExists,
  hashPassword,
  sanitizeEmailAndPassword,
} from './authHelpers'
import { encrypt } from './session'
import { cookies } from 'next/headers'

// Valida e autentica utilizador
export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const entries = Object.fromEntries(formData)

  // Valida os dados usando Zod
  const result = loginSchema.safeParse(entries)

  if (!result.success) {
    const errorMap = treeifyError(result.error)?.properties ?? {}

    return {
      errors: {
        email: errorMap.email?.errors ?? [],
        password: errorMap.password?.errors ?? [],
      },
      success: false,
    }
  }

  const { email, password } = result.data

  // Procura o utilizador na DB
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

  // Gera token JWT
  const token = await encrypt({ userId: user.id })

  // Define cookie de sessão
  const responseCookies = await cookies()

  responseCookies.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  return { errors: {}, success: true, userId: user.id }
}

const SALT_ROUNDS = 10

/** Regista novo utilizador */
export async function registerUser(data: unknown) {
  // Valida os dados usando Zod
  const validated: RegisterData = validateRegister(data)

  // Sanitiza e verifica email
  sanitizeEmailAndPassword(validated.email, validated.password)
  ensureEmailNotExists(validated.email)

  // Hash da password
  const hashed = await hashPassword(validated.password, SALT_ROUNDS)

  // Inserir utilizador na DB
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(validated.email, hashed)

  return { id: result.lastInsertRowid }
}
