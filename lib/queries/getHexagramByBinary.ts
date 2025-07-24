import db from '@/data/db/db'
import { mapHexagramRow, type HexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { HexagramObject } from '@/types/hexagram'

export const getHexagramByBinary = (binary: string): HexagramObject | null => {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE binary = ?')
  const row = stmt.get(binary) as HexagramRow | undefined
  return row ? mapHexagramRow(row) : null
}
