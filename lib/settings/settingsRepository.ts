import db from '@/data/db/db'

export type DBUser = { id: number; email: string; password: string }

export function getUserById(userId: number): DBUser | undefined {
  return db
    .prepare('SELECT id, email, password FROM users WHERE id = ?')
    .get(userId) as DBUser | undefined
}

export function getUserByEmail(email: string): DBUser | undefined {
  return db
    .prepare('SELECT id, email, password FROM users WHERE email = ?')
    .get(email) as DBUser | undefined
}

export function updateEmail(userId: number, email: string) {
  return db
    .prepare('UPDATE users SET email = ? WHERE id = ?')
    .run(email, userId)
}

export function updatePassword(userId: number, hash: string) {
  return db
    .prepare('UPDATE users SET password = ? WHERE id = ?')
    .run(hash, userId)
}

export function insertContactMessage(
  userId: number,
  email: string,
  subject: string,
  message: string
) {
  return db
    .prepare(
      'INSERT INTO contacts (user_id, email, subject, message) VALUES (?, ?, ?, ?)'
    )
    .run(userId, email, subject, message)
}

export function deleteUser(userId: number) {
  return db.prepare('DELETE FROM users WHERE id = ?').run(userId)
}
