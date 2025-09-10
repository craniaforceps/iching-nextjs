// lib/readings/db.ts
import db from '@/data/db/db'
import type { ReadingRow, ReadingInput } from '@/lib/types/hexagramTypes'
import { mapRowToView } from './readingHelpers'

export function selectReadingsByUser(userId: number): ReadingRow[] {
  return db
    .prepare(
      'SELECT * FROM readings WHERE user_id = :userId ORDER BY createdAt DESC'
    )
    .all({ userId }) as ReadingRow[]
}

export function insertReadingRow(data: ReadingInput): ReadingRow {
  const stmt = db.prepare(`
    INSERT INTO readings
      (user_id, question, notes, originalBinary, mutantBinary)
    VALUES
      (:user_id, :question, :notes, :originalBinary, :mutantBinary)
  `)

  // Executa o INSERT com named parameters
  const info = stmt.run({
    user_id: data.user_id,
    question: data.question,
    notes: data.notes ?? null,
    originalBinary: data.originalBinary,
    mutantBinary: data.mutantBinary,
  })

  // Recupera a linha completa incluindo createdAt
  const row = db
    .prepare('SELECT * FROM readings WHERE id = :id')
    .get({ id: info.lastInsertRowid }) as ReadingRow

  // Retorna já mapeada para ReadingView (se estiveres a usar mapRowToView)
  return mapRowToView(row)
}

export function selectReadingById(id: number): ReadingRow | undefined {
  return db.prepare('SELECT * FROM readings WHERE id = :id').get({ id }) as
    | ReadingRow
    | undefined
}

export function deleteReadingById(id: number): number {
  const stmt = db.prepare('DELETE FROM readings WHERE id = :id')
  const result = stmt.run({ id })
  return result.changes
}
