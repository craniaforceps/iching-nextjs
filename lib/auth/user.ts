import db from '@/data/db/db'
import type { User } from '@/lib/auth/types'
import { userSchema } from '@/lib/auth/authSchemas'

export function findUserByEmail(email: string): User | null {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  const user = stmt.get(email)

  if (!user) return null

  const parsed = userSchema.safeParse(user)
  if (!parsed.success) {
    console.error(parsed.error.format())
    return null
  }

  return parsed.data
}

// Função service para obter um utilizador pelo seu id
export function findUserById(id: number): User | null {
  // console.log('findUserById chamado com id:', id)
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  const user = stmt.get(id)
  // console.log('Resultado BD:', user)
  if (!user) return null

  const parsed = userSchema.safeParse(user)
  if (!parsed.success) {
    console.error('Erro a validar user:', parsed.error.format())
    return null
  }

  return parsed.data
}
