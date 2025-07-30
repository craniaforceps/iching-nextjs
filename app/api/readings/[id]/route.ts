// Zod

// Next
import { NextResponse } from 'next/server'

// DB
import db from '@/data/db/db'

// Helpers
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'

// Types
import type { ReadingRow, ReadingView } from '@/lib/types/hexagram'

// GET: Retorna todas as leituras com os hexagramas
export async function GET() {
  try {
    // base de dados
    const rows: ReadingRow[] = db
      .prepare('SELECT * FROM readings ORDER BY createdAt DESC')
      .all() as ReadingRow[]

    // itera sobre cada item
    const readings: ReadingView[] = await Promise.all(
      rows.map(async (row) => {
        const originalHexagram = await getHexagramByBinary(row.originalBinary)
        const mutantHexagram = await getHexagramByBinary(row.mutantBinary)

        // tratamento de erros - caso não existam
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
