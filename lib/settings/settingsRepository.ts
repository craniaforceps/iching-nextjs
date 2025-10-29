import db from '@/data/db/db'

export type DBUser = {
  id: number
  email: string
  password: string
  name?: string | null
  createdAt: string
}

export async function getUserById(userId: number): Promise<DBUser | undefined> {
  return await db.get<DBUser>(
    'SELECT id, email, password, name, createdAt FROM users WHERE id = ?',
    [userId]
  )
}

export async function getUserByEmail(
  email: string
): Promise<DBUser | undefined> {
  return await db.get<DBUser>(
    'SELECT id, email, password, name, createdAt FROM users WHERE email = ?',
    [email]
  )
}

export async function updateEmail(userId: number, email: string) {
  return await db.run('UPDATE users SET email = ? WHERE id = ?', [
    email,
    userId,
  ])
}

export async function updatePassword(userId: number, hash: string) {
  return await db.run('UPDATE users SET password = ? WHERE id = ?', [
    hash,
    userId,
  ])
}

export async function updateName(userId: number, name: string) {
  return await db.run('UPDATE users SET name = ? WHERE id = ?', [name, userId])
}

export async function insertContactMessage(
  userId: number,
  email: string,
  subject: string,
  message: string,
  topic?: string,
  sequence?: string
) {
  return await db.run(
    `INSERT INTO contacts (user_id, email, subject, message, topic)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, email, subject, message, topic || null]
  )
}

export async function deleteUser(userId: number) {
  return await db.run('DELETE FROM users WHERE id = ?', [userId])
}
