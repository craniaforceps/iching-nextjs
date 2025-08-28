'use client'

import HexagramCard from '@/components/features/display/HexagramCard'
import type { HexagramObject } from '@/lib/types/hexagramTypes'

type ResponsiveHexagramLayoutProps = {
  table: React.ReactNode
  selectedHexagram: HexagramObject | null
}

export default function ResponsiveHexagramLayout({
  table,
  selectedHexagram,
}: ResponsiveHexagramLayoutProps) {
  const hasSelection = !!selectedHexagram

  return (
    <div
      className={`grid gap-6 items-start w-full max-w-7xl mx-auto px-1
        ${hasSelection ? 'lg:grid-cols-[2fr_1fr]' : 'grid-cols-1'}
      `}
    >
      {/* Tabela */}
      <div>{table}</div>

      {/* Card à direita, só se houver seleção */}
      {hasSelection && (
        <div>
          <HexagramCard title="Hexagrama" hexagram={selectedHexagram} />
        </div>
      )}
    </div>
  )
}
