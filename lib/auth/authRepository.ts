import db from '@/data/db/db'
import { userSchema } from './authSchemas'
import type { User } from './types'

export async function findUserByEmail(email: string): Promise<User | null> {
  const raw = await db.get<User>('SELECT * FROM users WHERE email = ?', [email])
  if (!raw) return null

  const parsed = userSchema.safeParse(raw)
  if (!parsed.success) {
    console.error(parsed.error.format())
    return null
  }

  return parsed.data
}

export async function findUserById(id: number): Promise<User | null> {
  const raw = await db.get<User>('SELECT * FROM users WHERE id = ?', [id])
  if (!raw) return null

  const parsed = userSchema.safeParse(raw)
  if (!parsed.success) {
    console.error(parsed.error.format())
    return null
  }

  return parsed.data
}

export async function insertUser(
  email: string,
  hashedPassword: string
): Promise<number> {
  const result = await db.run(
    'INSERT INTO users (email, password, createdAt) VALUES (?, ?, ?)',
    [email, hashedPassword, new Date().toISOString()]
  )
  return Number(result.lastInsertRowid)
}
