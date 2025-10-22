import db from '@/data/db/db'
import type { HexagramRow } from '@/lib/hexagram/hexagramTypes'

export async function getHexagramRowByNumber(
  number: number
): Promise<HexagramRow | null> {
  const row = await db.get<HexagramRow>(
    'SELECT * FROM hexagrams WHERE number = ?',
    [number]
  )
  return row ?? null
}

export async function getHexagramRowByBinary(
  binary: string
): Promise<HexagramRow | null> {
  const row = await db.get<HexagramRow>(
    'SELECT * FROM hexagrams WHERE binary = ?',
    [binary]
  )
  return row ?? null
}

export async function getAllHexagrams(): Promise<HexagramRow[]> {
  return await db.all<HexagramRow>(
    'SELECT * FROM hexagrams ORDER BY number ASC'
  )
}
