import type {
  BinaryMatchInput,
  BinaryMatchOutput,
  HexagramRow,
} from '@/lib/hexagram/hexagramTypes'
import db from '@/data/db/db'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'

// Encontra os hexagramas correspondentes na DB a partir dos valores binários.
// Retorna null se não encontrar ambos os hexagramas ou em caso de erro.
export const findMatchingHexagrams = async ({
  binary1,
  binary2,
}: BinaryMatchInput): Promise<BinaryMatchOutput | null> => {
  try {
    const stmt = db.prepare('SELECT * FROM hexagrams WHERE binary = ?')

    // o .get retorna undefined caso não encontre o hexagrama
    const match1Row = stmt.get(binary1) as HexagramRow | undefined
    const match2Row = stmt.get(binary2) as HexagramRow | undefined

    if (!match1Row || !match2Row) return null

    return {
      match1: mapHexagramRow(match1Row),
      match2: mapHexagramRow(match2Row),
    }
  } catch (err) {
    console.error('Erro ao procurar hexagramas na DB', err)
    return null
  }
}
