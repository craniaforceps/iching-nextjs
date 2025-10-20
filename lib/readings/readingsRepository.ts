import db from '@/data/db/db'
import type { ReadingRow, ReadingInput } from '@/lib/readings/readingsTypes'

export function getUserReadings(userId: number): ReadingRow[] {
  return db
    .prepare('SELECT * FROM readings WHERE user_id = ? ORDER BY createdAt DESC')
    .all(userId) as ReadingRow[]
}

export function getReadingById(id: number): ReadingRow | undefined {
  return db.prepare('SELECT * FROM readings WHERE id = ?').get(id) as
    | ReadingRow
    | undefined
}

export function insertUserReading(data: ReadingInput) {
  const stmt = db.prepare(`
    INSERT INTO readings (user_id, question, notes, originalBinary, mutantBinary)
    VALUES (:user_id, :question, :notes, :originalBinary, :mutantBinary)
  `)
  const info = stmt.run(data)
  return db
    .prepare('SELECT * FROM readings WHERE id = ?')
    .get(info.lastInsertRowid) as ReadingRow
}

export function updateReading(
  id: number,
  fields: Partial<ReadingInput>
): ReadingRow | undefined {
  const updates = Object.keys(fields)
    .map((f) => `${f} = @${f}`)
    .join(', ')
  db.prepare(`UPDATE readings SET ${updates} WHERE id = @id`).run({
    id,
    ...fields,
  })
  return getReadingById(id)
}

export function deleteReading(id: number) {
  return db.prepare('DELETE FROM readings WHERE id = ?').run(id)
}
