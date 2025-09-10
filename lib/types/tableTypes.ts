import { HexagramObject } from './hexagramTypes'
export type HexagramCellProps = {
  number: number
  symbol: string
  englishName: string
  isSelected: boolean
  isHovered: boolean
  onClick: (number: number, symbol: string, englishName: string) => void
  onMouseEnter: (number: number, symbol: string, englishName: string) => void
  onMouseLeave: () => void
}

export type HexagramTableProps = {
  hexagramNumbers: number[][]
  hexagramSymbols: string[][]
  hexagramNames: string[][]
  selectedHexagram: HexagramObject | null
  hoveredHexagram: HexagramObject | null
  onClick: (partial: { number: number }) => void
  onHover: (partial: { number: number }) => void
  onHoverLeave: () => void
}

export type ResponsiveHexagramLayoutProps = {
  table: React.ReactNode
  selectedHexagram: HexagramObject | null
  trigrams?: string[]
}

export type HexagramLayoutProps = {
  hexagrams: { match1: HexagramObject; match2: HexagramObject }
  layout: 'stacked' | 'horizontal' | 'vertical'
}
