import type { HexagramObject, HexagramRow } from '@/lib/types/hexagram'

export const mapHexagramRow = (row: HexagramRow): HexagramObject => {
  // Define line_1, etc, como parte de HexagramRow
  const lineKeys: (keyof HexagramRow)[] = [
    'line_1',
    'line_2',
    'line_3',
    'line_4',
    'line_5',
    'line_6',
  ]

  // Faz o parse do JSON do SQLite
  const lines = lineKeys.map((key) => JSON.parse(row[key] as string))

  // Devolve um HexagramObject renomeado para uso no frontend
  return {
    number: row.number,
    name: row.name_en,
    unicode: row.unicode_hexagram,
    info: row.summary,
    binary: row.binary,
    details: {
      image: JSON.parse(row.image),
      judgment: JSON.parse(row.judgment),
      lines,
    },
  }
}
