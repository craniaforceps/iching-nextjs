// Zod
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

// Next
import { NextResponse } from 'next/server'

// Random ID
import { randomUUID } from 'crypto'

// DB
import db from '@/data/db/db'

// Helpers
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'

// Types
import type { ReadingRow, ReadingView } from '@/types/hexagram'

// GET: Retorna todas as leituras com hexagramas enriquecidos
export async function GET() {
  try {
    const rows: ReadingRow[] = db
      .prepare('SELECT * FROM readings ORDER BY createdAt DESC')
      .all() as ReadingRow[]

    // Mapeia os binários para hexagramas completos
    const readings: ReadingView[] = await Promise.all(
      rows.map(async (row) => {
        const originalHexagram = await getHexagramByBinary(row.originalBinary)
        const mutantHexagram = await getHexagramByBinary(row.mutantBinary)

        if (!originalHexagram || !mutantHexagram) {
          throw new Error(
            'Hexagramas não encontrados para os binários fornecidos.'
          )
        }

        return {
          ...row,
          originalHexagram,
          mutantHexagram,
        }
      })
    )

    return NextResponse.json(readings)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET readings:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

// POST: Cria nova leitura e retorna com hexagramas enriquecidos
export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = ReadingInputSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    const originalHexagram = getHexagramByBinary(data.originalHexagram.binary)
    const mutantHexagram = getHexagramByBinary(data.mutantHexagram.binary)

    if (!originalHexagram || !mutantHexagram) {
      return NextResponse.json(
        { success: false, error: 'Hexagramas não encontrados' },
        { status: 400 }
      )
    }

    const newReading: ReadingView = {
      id: randomUUID(),
      question: data.question,
      notes: data.notes ?? null,
      createdAt: new Date().toISOString(),
      originalBinary: originalHexagram.binary,
      mutantBinary: mutantHexagram.binary,
      originalHexagram,
      mutantHexagram,
    }

    const stmt = db.prepare(`
      INSERT INTO readings (id, question, notes, createdAt, originalBinary, mutantBinary)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      newReading.id,
      newReading.question,
      newReading.notes,
      newReading.createdAt,
      newReading.originalBinary,
      newReading.mutantBinary
    )

    return NextResponse.json({ success: true, reading: newReading })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

// DELETE: Remove leitura pelo ID
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID em falta' },
        { status: 400 }
      )
    }

    const stmt = db.prepare('DELETE FROM readings WHERE id = ?')
    const result = stmt.run(id)

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Leitura não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
