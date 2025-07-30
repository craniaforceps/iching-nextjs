// Types das Leituras

// Type relativo ao input de binários nas leituras
export type BinaryMatchInput = {
  binary1: string
  binary2: string
}

// Type relativo aos outpus resultantes dos match
export type BinaryMatchOutput = {
  match1: HexagramObject
  match2: HexagramObject
}

// Type relativo à conversão das tabelas de consulta em SQL
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

// Type convertido e usado no frontend
export type HexagramObject = {
  number: number
  name: string
  binary: string
  unicode: string
  info: string
  details?: HexagramDetails
}

export type HexagramDetails = {
  judgment: string[]
  image: string[]
  lines: string[][]
}

// Type para a utilização e props como title
export type HexagramCardProps = {
  title: string
  hexagram: HexagramObject | null
}

export type Reading = {
  id: string
  question: string
  notes: string | null
  createdAt: string
  originalBinary: string
  mutantBinary: string
}

export type ReadingView = ReadingRow & {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
}

export type ReadingItemProps = {
  reading: ReadingView
  onDelete: (id: string) => void
  isOpen: boolean
  onToggle: () => void
}

export type ReadingRow = {
  id: string
  question: string
  notes: string | null
  createdAt: string
  originalBinary: string
  mutantBinary: string
}

export type User = {
  id: string
  email: string
  password: string
  createdAt: string
}
