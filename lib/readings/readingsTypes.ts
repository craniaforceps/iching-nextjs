import type { HexagramObject } from '@/lib/hexagram/hexagramTypes'
import type { Line } from '@/lib/hexagram/hexagramTypes'
// === Reading DB Rows ===
export type ReadingRow = {
  id: number
  user_id: number
  question: string
  notes?: string | null
  createdAt?: string
  originalBinary: string
  mutantBinary: string
  hexagramRaw: string
}

export type Reading = {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
  hexagramRaw: string
  lines?: Line[]
}

// === Reading used in frontend with Hexagrams ===
export type ReadingView = ReadingRow & {
  originalHexagram: HexagramObject
  mutantHexagram: HexagramObject
  hexagramRaw: string
  lines?: Line[]
}

// === Input para criar uma leitura ===
export type ReadingInput = {
  user_id: number
  question: string
  notes?: string | null
  originalBinary: string
  mutantBinary: string
  hexagramRaw: string
}

// Props para componentes
export type ReadingItemProps = {
  reading: ReadingView
  onDelete: (id: number) => void
  isOpen: boolean
  onToggle: () => void
}

// Erro genérico
export type ErrorResponse = {
  error: string
}

export type ReadingListProps = {
  readings: ReadingView[]
  openId: number | null
  setOpenId: (id: number | null) => void
  onDelete: (id: number) => void
}
