import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import db from '@/data/db/db'
import type { ReadingRow } from '@/types/hexagram'
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'

export async function GET() {
  try {
    const rows = db
      .prepare('SELECT * FROM readings ORDER BY createdAt DESC')
      .all() as ReadingRow[]

    const readings = rows.map((row) => ({
      ...row,
      originalHexagram: getHexagramByBinary(row.originalBinary),
      mutantHexagram: getHexagramByBinary(row.mutantBinary),
    }))

    return NextResponse.json(readings)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET readings:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (
      !data.question ||
      typeof data.question !== 'string' ||
      !data.originalBinary ||
      typeof data.originalBinary !== 'string' ||
      !data.mutantBinary ||
      typeof data.mutantBinary !== 'string'
    ) {
      return NextResponse.json(
        { success: false, error: 'Original or mutant binary missing' },
        { status: 400 }
      )
    }

    const newReading = {
      id: randomUUID(),
      question: data.question,
      notes: data.notes || null,
      createdAt: new Date().toISOString(),
      originalBinary: data.originalBinary,
      mutantBinary: data.mutantBinary,
    }

    const stmt = db.prepare(`
      INSERT INTO readings (
        id, question, notes, createdAt,
        originalBinary, mutantBinary
      ) VALUES (?, ?, ?, ?, ?, ?)
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
