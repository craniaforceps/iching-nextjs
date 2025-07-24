import type { HexagramObject } from '@/types/hexagram'

export type HexagramRow = {
  number: number
  name_en: string
  unicode_hexagram: string
  summary: string
  binary: string
  image: string
  judgment: string
  line_1: string
  line_2: string
  line_3: string
  line_4: string
  line_5: string
  line_6: string
}

export const mapHexagramRow = (row: HexagramRow): HexagramObject => {
  const lineKeys: (keyof HexagramRow)[] = [
    'line_1',
    'line_2',
    'line_3',
    'line_4',
    'line_5',
    'line_6',
  ]

  const lines = lineKeys.map((key) => JSON.parse(row[key] as string))

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
