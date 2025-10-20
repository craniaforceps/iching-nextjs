import type { HexagramRow, HexagramObject } from '@/lib/hexagram/hexagramTypes'

// Esta função converte os dados de HexagramRow para HexagramObject
export const mapHexagramRow = (row: HexagramRow): HexagramObject => {
  // keyof diz-nos que as lineKeys têm de ser nomes de propriedades reais de HexagramRow
  const lineKeys: (keyof HexagramRow)[] = [
    'line_1',
    'line_2',
    'line_3',
    'line_4',
    'line_5',
    'line_6',
  ]

  // Condensa as seis colunas (line_1, line_2, etc) num só array lines
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
