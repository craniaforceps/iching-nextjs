import db from '@/data/db/db'
import type { User } from './types'
import { userSchema } from '@/lib/auth/authSchemas'

/** Busca user por email, retorna null se não existir */
export function findUserByEmail(email: string): User | null {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  const raw = stmt.get(email)
  if (!raw) return null

  const parsed = userSchema.safeParse(raw)
  if (!parsed.success) return null

  return parsed.data
}

/** Busca user por ID, retorna null se não existir */
export function findUserById(id: number): User | null {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  const raw = stmt.get(id)
  if (!raw) return null

  const parsed = userSchema.safeParse(raw)
  if (!parsed.success) return null

  return parsed.data
}

/** Insere um novo user e retorna o resultado da query */
export function insertUser(email: string, hashedPassword: string) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
  return stmt.run(email, hashedPassword)
}
