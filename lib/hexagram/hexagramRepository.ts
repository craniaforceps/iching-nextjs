import db from '@/data/db/db'
import type { HexagramRow } from '@/lib/hexagram/hexagramTypes'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'

export function getHexagramRowByNumber(number: number) {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE number = ?')
  return stmt.get(number) as HexagramRow | undefined
}

export function getHexagramRowByBinary(binary: string) {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE binary = ?')
  return stmt.get(binary) as HexagramRow | undefined
}

export function getAllHexagrams(): HexagramRow[] {
  const stmt = db.prepare('SELECT * FROM hexagrams ORDER BY number ASC')
  return stmt.all() as HexagramRow[]
}
