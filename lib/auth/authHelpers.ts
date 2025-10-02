import db from '@/data/db/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { errorResponse, successResponse } from '../api/responses'
import { findUserById } from './user'

/** Remove espaços e normaliza email */
export function sanitizeEmailAndPassword(email: string, password: string) {
  return {
    email: email.trim().toLowerCase(),
    password: password.trim(),
  }
}

/** Verifica se email já existe na base de dados */
export function ensureEmailNotExists(email: string) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    throw new Error(`Este email já está registado: ${email}`)
  }
}
/** Hash da password */
export async function hashPassword(password: string, saltRounds = 10) {
  return await bcrypt.hash(password, saltRounds)
}

// Função para autenticar o utilizador através do cookie de sessão
export async function authenticateUser(): Promise<number> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session?.value) throw new Error('Não autenticado')

  const payload = await decrypt(session.value)

  if (!payload || typeof payload.userId !== 'number') {
    throw new Error('Sessão inválida')
  }

  return payload.userId
}

// Função para autenticar a sessão e obter o utilizador
export async function authenticateSession(sessionValue: string | undefined) {
  try {
    const payload = await decrypt(sessionValue)
    if (!payload || typeof payload.userId !== 'number') {
      errorResponse('Sessão inválida', 401)
      throw new Error('Sessão inválida')
    }
    // Buscar o utilizador na base de dados
    const user = await findUserById(payload.userId)
    if (!user) {
      throw new Error('Utilizador não encontrado')
    }
    return user
  } catch (error) {
    throw new Error(
      `Erro ao validar sessão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    )
  }
}
