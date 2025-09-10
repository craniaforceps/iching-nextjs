import db from '@/data/db/db'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { HexagramObject, HexagramRow } from '@/lib/types/hexagramTypes'

// Função auxiliar para mostrar o histórico de leituras que pega nos binary e devolve os hexagramas - passar para hexagramService
export const getHexagramByBinary = (binary: string): HexagramObject | null => {
  const stmt = db.prepare('SELECT * FROM hexagrams WHERE binary = ?')
  const row = stmt.get(binary) as HexagramRow | undefined //não uso .all pois binary é unico
  return row ? mapHexagramRow(row) : null
}
