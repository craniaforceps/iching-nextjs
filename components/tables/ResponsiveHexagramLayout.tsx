// Serve para ajustar o layout se houver a selecção de um hexagrama na tabela

import { ResponsiveHexagramLayoutProps } from '@/lib/hexagram/hexagramTypes'
import HexagramCard from '../hexagram/HexagramCard'

// O componente que ajusta o layout da tabela de hexagramas e do card de seleção
export default function ResponsiveHexagramLayout({
  table,
  selectedHexagram,
}: ResponsiveHexagramLayoutProps) {
  // Verifica se houver uma seleção de hexagrama - !! transforma em boolean
  const hasSelection = !!selectedHexagram

  return (
    // Grid com duas colunas se houver seleção
    <div
      className={`grid gap-6 items-start w-full max-w-7xl mx-auto px-1
        ${hasSelection ? 'lg:grid-cols-[2fr_1fr]' : 'grid-cols-1'}
      `}
    >
      {/* Tabela */}
      <div>{table}</div>

      {/* Card à direita se houver seleção */}
      {hasSelection && (
        <div>
          <HexagramCard title="Hexagrama" hexagram={selectedHexagram} />
        </div>
      )}
    </div>
  )
}
