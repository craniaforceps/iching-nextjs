import { NextResponse } from 'next/server'
import db from '@/data/db/db'
import { getHexagramByBinary } from '@/lib/queries/getHexagramByBinary'
import type { ReadingRow, ReadingView } from '@/lib/types/hexagramTypes'

export async function getReadings() {
  try {
    const rows: ReadingRow[] = db
      .prepare('SELECT * FROM readings ORDER BY createdAt DESC')
      .all() as ReadingRow[]

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

    return readings
  } catch (err) {
    throw err
  }
}

export async function deleteReading(id: string) {
  try {
    if (!id) {
      throw new Error('ID em falta')
    }

    const stmt = db.prepare('DELETE FROM readings WHERE id = ?')
    const result = stmt.run(id)

    if (result.changes === 0) {
      throw new Error('Leitura não encontrada')
    }

    return { success: true }
  } catch (err) {
    throw err
  }
}

export function handleError(err: unknown) {
  const error = err instanceof Error ? err.message : 'Erro desconhecido'
  console.error('Erro:', error)
  return NextResponse.json({ error }, { status: 500 })
}

export async function GET() {
  try {
    const readings = await getReadings()
    return NextResponse.json(readings)
  } catch (err) {
    return handleError(err)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const result = await deleteReading(id)
    return NextResponse.json(result)
  } catch (err) {
    return handleError(err)
  }
}
