import db from '@/data/db/db'
import type { HexagramRow } from '@/lib/hexagram/hexagramTypes'

export async function findMatchingHexagrams({
  binary1,
  binary2,
}: {
  binary1: string
  binary2: string
}): Promise<{ match1: HexagramRow; match2: HexagramRow } | null> {
  const match1Row = await db.get<HexagramRow>(
    'SELECT * FROM hexagrams WHERE binary = ?',
    [binary1]
  )

  const match2Row = await db.get<HexagramRow>(
    'SELECT * FROM hexagrams WHERE binary = ?',
    [binary2]
  )

  if (!match1Row || !match2Row) return null

  return {
    match1: match1Row,
    match2: match2Row,
  }
}
