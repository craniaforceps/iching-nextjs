import db from '@/data/db/db'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { HexagramObject, HexagramRow } from '@/lib/types/hexagramTypes'

export const getHexagramByNumber = (id: number): HexagramObject | null => {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE number = ?')
  const row = stmt.get(id) as HexagramRow | undefined
  return row ? mapHexagramRow(row) : null
}
