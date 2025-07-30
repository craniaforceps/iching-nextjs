import db from '@/data/db/db'
import { z } from 'zod'
import type { User } from '@/lib/types/hexagram'

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string(),
})

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
