import { HexagramLayoutProps } from '@/lib/hexagram/hexagramTypes'
import HexagramCard from './HexagramCard'

// O componente que mostra os hexagramas em diferentes layouts
export default function HexagramGrid({
  hexagrams,
  layout,
}: HexagramLayoutProps) {
  const isVertical = layout === 'vertical'
  const isHorizontal = layout === 'horizontal'
  const isStacked = layout === 'stacked'

  return (
    <div
      className={`flex flex-col gap-6 ${isVertical ? 'lg:flex-row' : 'flex-col'}`}
    >
      <div
        className={`
          ${isStacked ? 'w-full grid grid-cols-1 gap-6' : ''}
          ${isHorizontal ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-6' : ''}
          ${isVertical ? 'flex-1 grid grid-cols-1 gap-6' : ''}
        `}
      >
        <HexagramCard title="Original" hexagram={hexagrams.match1} />
        <HexagramCard title="Mutante" hexagram={hexagrams.match2} />
      </div>
    </div>
  )
}
