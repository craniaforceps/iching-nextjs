import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import db from '@/data/db/db'
import type { ReadingRow, ReadingView } from '@/lib/types/hexagram'
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

// Para apresentar as leituras de cada utilizador
export async function GET() {
  try {
    // Vai buscar a tabela referente às readings
    const rows = db
      .prepare('SELECT * FROM readings ORDER BY createdAt DESC')
      .all() as ReadingRow[]

    // Transforma a tabela num array e acrescenta os hexagrams (vai buscar tendo em conta os binary) - usa o getHexagramByBinary que por sua vez usa o mapHexagram

    const readings = rows.map((row) => ({
      ...row,
      originalHexagram: getHexagramByBinary(row.originalBinary),
      mutantHexagram: getHexagramByBinary(row.mutantBinary),
    }))

    // Devolve o objecto pronto para ser usado no frontend
    return NextResponse.json(readings)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET readings:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

//
// POST: Guarda a leitura
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Tipagem e erros
    const parsed = ReadingInputSchema.safeParse(body)

    if (!parsed.success) {
      console.error('Erro de validação Zod:', parsed.error.message)
      return NextResponse.json(
        { success: false, error: parsed.error.message },
        { status: 400 }
      )
    }

    // Acesso à informação
    const data = parsed.data

    // Obtém os hexagramas relativos aos binários
    const originalHexagram = getHexagramByBinary(data.originalBinary)
    const mutantHexagram = getHexagramByBinary(data.mutantBinary)

    // Tratamento de erros
    if (!originalHexagram || !mutantHexagram) {
      return NextResponse.json(
        { success: false, error: 'Hexagramas não encontrados' },
        { status: 400 }
      )
    }

    // Conversão para objecto do frontend - caso necessário
    const newReading: ReadingView = {
      id: randomUUID(),
      question: data.question,
      notes: data.notes ?? null,
      createdAt: new Date().toISOString(),
      originalBinary: data.originalBinary,
      mutantBinary: data.mutantBinary,
      originalHexagram,
      mutantHexagram,
    }

    // Acrescenta leitura à base de dados
    const stmt = db.prepare(`
      INSERT INTO readings (id, question, notes, createdAt, originalBinary, mutantBinary)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    // Campos que serão guardados - só são guardados os binários e não os hexagramas
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
    console.error('Erro no POST /api/readings:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
