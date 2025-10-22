// lib/readings/readingsRepository.ts
import db from '@/data/db/db'
import type { ReadingRow, ReadingInput } from '@/lib/readings/readingsTypes'

// 🔹 Obter todas as leituras de um utilizador
export async function getUserReadings(userId: number): Promise<ReadingRow[]> {
  // db.all já retorna ReadingRow[]
  const rows = await db.all<ReadingRow>(
    'SELECT * FROM readings WHERE user_id = ? ORDER BY createdAt DESC',
    [userId]
  )
  return rows
}

// 🔹 Obter uma leitura específica por ID
export async function getReadingById(id: number): Promise<ReadingRow | null> {
  const row = await db.get<ReadingRow>('SELECT * FROM readings WHERE id = ?', [
    id,
  ])
  return row || null
}

// 🔹 Inserir uma nova leitura (createdAt é definido automaticamente pela DB)
export async function insertUserReading(
  data: ReadingInput
): Promise<ReadingRow> {
  const result = await db.run(
    `INSERT INTO readings (user_id, question, notes, originalBinary, mutantBinary)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.question,
      data.notes,
      data.originalBinary,
      data.mutantBinary,
    ]
  )

  const newId = Number(result.lastInsertRowid)
  const row = await getReadingById(newId)
  if (!row) throw new Error('Erro ao criar leitura')
  return row
}

// 🔹 Atualizar leitura existente
export async function updateReading(
  id: number,
  fields: Partial<ReadingInput>
): Promise<ReadingRow | null> {
  const updates = Object.keys(fields)
    .map((f) => `${f} = ?`)
    .join(', ')
  const values = Object.values(fields)

  if (!updates) return await getReadingById(id)

  await db.run(`UPDATE readings SET ${updates} WHERE id = ?`, [...values, id])
  return await getReadingById(id)
}

// 🔹 Apagar leitura
export async function deleteReading(id: number): Promise<void> {
  await db.run('DELETE FROM readings WHERE id = ?', [id])
}
