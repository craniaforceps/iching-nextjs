'use server'

import { treeifyError } from 'zod'
import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import type {
  LoginState,
  User,
  RegisterData,
  RegisterState,
} from '@/lib/types/authTypes'
import { loginSchema, registerSchema } from '@/lib/schemas/authSchemas'
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

  // Se falhar, retorna os erros
  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return {
      errors: {
        email: fieldErrors.email ?? [], // ⚡ mensagens do Zod, ex: "Email inválido"
        password: fieldErrors.password ?? [], // ⚡ mensagens do Zod
      },
      success: false,
    }
  }

  // Extrai email e password
  const { email, password } = result.data

  // Procura o utilizador na DB
  const user = db
    .prepare('SELECT id, email, password FROM users WHERE email = ?')
    .get(email) as User | undefined

  // Se não existir ou password inválida, retorna erro
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

// Número de rondas para bcrypt
const SALT_ROUNDS = 10

/** Regista novo utilizador */
export async function registerUser(formData: FormData): Promise<RegisterState> {
  const data = Object.fromEntries(formData) as {
    email?: string
    password?: string
  }

  try {
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
      // Extrai apenas mensagens amigáveis
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

    // Verifica se email já existe, sanitiza e cria hash
    sanitizeEmailAndPassword(cleanEmail, cleanPassword)
    ensureEmailNotExists(cleanEmail)
    const hashed = await hashPassword(cleanPassword, 10)
    const result = db
      .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(cleanEmail, hashed)
    const newUserId = Number(result.lastInsertRowid)

    // Login automático
    const token = await encrypt({ userId: newUserId })
    const responseCookies = await cookies()
    responseCookies.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { errors: {}, success: true }
  } catch (err: any) {
    return {
      errors: { email: [err.message || 'Erro ao criar conta'] },
      success: false,
    }
  }
}
