import db from '@/data/db/db'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { HexagramObject, HexagramRow } from '@/lib/types/hexagramTypes'
const getHexagramStmt = db.prepare('SELECT * FROM hexagrams WHERE number = ?')

export const getHexagramByNumber = (id: number): HexagramObject | null => {
  const row = getHexagramStmt.get(id) as HexagramRow | undefined
  return row ? mapHexagramRow(row) : null
}
