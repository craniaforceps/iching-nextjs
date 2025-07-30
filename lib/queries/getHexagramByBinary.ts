import db from '@/data/db/db'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { HexagramObject, HexagramRow } from '@/lib/types/hexagram'

// Função auxiliar para mostrar o histórico de leituras que pega nos binary e devolve os hexagramas
export const getHexagramByBinary = (binary: string): HexagramObject | null => {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE binary = ?')
  const row = stmt.get(binary) as HexagramRow | undefined
  return row ? mapHexagramRow(row) : null
}
