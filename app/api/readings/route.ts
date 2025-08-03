import { NextResponse } from 'next/server'
import db from '@/data/db/db'
import type { ReadingRow, ReadingView } from '@/lib/types/hexagramTypes'
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'
import { decrypt } from '@/lib/auth/session'
import { cookies } from 'next/headers'

// Para apresentar as leituras de cada utilizador
export async function GET() {
  try {
    // Autenticar
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    if (!session?.value) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const payload = await decrypt(session.value)
    if (!payload?.userId) {
      return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 })
    }

    // Buscar leituras do user
    const rows = db
      .prepare(
        'SELECT * FROM readings WHERE user_id = ? ORDER BY createdAt DESC'
      )
      .all(payload.userId) as ReadingRow[]

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

    const data = parsed.data

    // Obtém os hexagramas relativos aos binários
    const originalHexagram = getHexagramByBinary(data.originalBinary)
    const mutantHexagram = getHexagramByBinary(data.mutantBinary)

    if (!originalHexagram || !mutantHexagram) {
      return NextResponse.json(
        { success: false, error: 'Hexagramas não encontrados' },
        { status: 400 }
      )
    }

    const createdAt = new Date().toISOString()

    // Preparar statement sem o id, pois será gerado automaticamente
    const stmt = db.prepare(`
      INSERT INTO readings (user_id, question, notes, createdAt, originalBinary, mutantBinary)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    // Executar inserção
    const info = stmt.run(
      data.user_id,
      data.question,
      data.notes ?? null,
      createdAt,
      data.originalBinary,
      data.mutantBinary
    )

    // Construir o objeto a retornar, incluindo o id gerado
    const newReading: ReadingView = {
      id: Number(info.lastInsertRowid), // ou número se preferir number no teu tipo
      user_id: data.user_id,
      question: data.question,
      notes: data.notes ?? null,
      createdAt,
      originalBinary: data.originalBinary,
      mutantBinary: data.mutantBinary,
      originalHexagram,
      mutantHexagram,
    }

    return NextResponse.json({ success: true, reading: newReading })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no POST /api/readings:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
