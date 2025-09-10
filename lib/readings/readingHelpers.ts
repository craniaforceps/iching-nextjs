import db from '@/data/db/db'
import { getHexagramByBinary } from '@/lib/hexagram/getHexagramByBinary'
import type {
  ReadingInput,
  ReadingView,
  ReadingRow,
} from '@/lib/types/hexagramTypes'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

export function validateReadingInput(payload: unknown): ReadingInput {
  const parsed = ReadingInputSchema.safeParse(payload)
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  }
  return parsed.data
}

export function mapRowToView(row: ReadingRow): ReadingView {
  return {
    ...row,
    originalHexagram: getHexagramByBinary(row.originalBinary)!,
    mutantHexagram: getHexagramByBinary(row.mutantBinary)!,
  }
}

export function mapRowsToViews(rows: ReadingRow[]): ReadingView[] {
  return rows.map(mapRowToView)
}

export function getUserReadings(userId: number): ReadingView[] {
  const rows: ReadingRow[] = db
    .prepare('SELECT * FROM readings WHERE user_id = ? ORDER BY createdAt DESC')
    .all(userId) as ReadingRow[]

  return mapRowsToViews(rows)
}

export function insertUserReading(data: ReadingInput): ReadingView {
  // const createdAt = new Date().toISOString()
  const stmt = db.prepare(`
    INSERT INTO readings (user_id, question, notes, originalBinary, mutantBinary)
    VALUES (?, ?, ?, ?, ?)
  `)

  const info = stmt.run(
    data.user_id,
    data.question,
    data.notes ?? null,
    // createdAt,
    data.originalBinary,
    data.mutantBinary
  )

  return {
    id: Number(info.lastInsertRowid),
    user_id: data.user_id,
    question: data.question,
    notes: data.notes ?? null, // garante string | null
    // createdAt,
    originalBinary: data.originalBinary,
    mutantBinary: data.mutantBinary,
    originalHexagram: getHexagramByBinary(data.originalBinary)!,
    mutantHexagram: getHexagramByBinary(data.mutantBinary)!,
  }
}

export function deleteUserReading(id: number, userId: number) {
  const row = db
    .prepare('SELECT user_id FROM readings WHERE id = ?')
    .get(id) as ReadingRow | undefined

  if (!row) throw new Error('Leitura não encontrada')
  if (row.user_id !== userId) throw new Error('Não autorizado')

  const stmt = db.prepare('DELETE FROM readings WHERE id = ?')
  const result = stmt.run(id)
  if (result.changes === 0) throw new Error('Falha ao apagar leitura')

  return { success: true }
}

export function updateUserReading(
  id: number,
  userId: number,
  data: { question?: string; notes?: string }
) {
  // Verifica se a leitura existe e pertence ao user
  const row = db
    .prepare('SELECT * FROM readings WHERE id = ? AND user_id = ?')
    .get(id, userId) as ReadingRow | undefined

  if (!row) throw new Error('Leitura não encontrada ou não autorizada')

  // Atualiza os campos fornecidos
  const stmt = db.prepare(`
    UPDATE readings
    SET question = COALESCE(:question, question),
        notes = COALESCE(:notes, notes)
    WHERE id = :id
  `)

  stmt.run({
    id,
    question: data.question,
    notes: data.notes,
  })

  // Retorna a leitura atualizada
  const updatedRow = db
    .prepare('SELECT * FROM readings WHERE id = ?')
    .get(id) as ReadingRow
  return mapRowToView(updatedRow)
}
