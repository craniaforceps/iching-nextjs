import { useState } from 'react'
import { ResponsiveHexagramLayoutProps } from '@/lib/hexagram/hexagramTypes'
import HexagramCard from '../hexagram/HexagramCard'

export default function ResponsiveHexagramLayout({
  table,
  selectedHexagram,
}: ResponsiveHexagramLayoutProps) {
  const hasSelection = !!selectedHexagram

  // Estado para alternar layout: true = horizontal, false = stacked
  const [isHorizontal, setIsHorizontal] = useState(true)

  return (
    <div className="w-full max-w-7xl mx-auto px-1">
      {/* Botão de toggle somente se houver seleção e em telas grandes */}
      {hasSelection && (
        <div className="flex mb-2 lg:block hidden text-center justify-center mx-auto ">
          <button
            onClick={() => setIsHorizontal((prev) => !prev)}
            className="cursor-pointer px-3 py-1 mb-2 text-xs border rounded hover:bg-amber-400"
          >
            {isHorizontal ? 'Stacked' : 'Horizontal'}
          </button>
        </div>
      )}

      {/* Grid com base no estado do toggle */}
      <div
        className={`grid gap-6 items-start
          ${
            hasSelection
              ? isHorizontal
                ? 'lg:grid-cols-[2fr_1fr]'
                : 'lg:grid-cols-1'
              : 'grid-cols-1'
          }
        `}
      >
        <div>{table}</div>

        {hasSelection && isHorizontal && (
          <div>
            <HexagramCard title="Hexagrama" hexagram={selectedHexagram} />
          </div>
        )}

        {/* Se stacked, mostra o card abaixo da tabela */}
        {hasSelection && !isHorizontal && (
          <div>
            <HexagramCard title="Hexagrama" hexagram={selectedHexagram} />
          </div>
        )}
      </div>
    </div>
  )
}
