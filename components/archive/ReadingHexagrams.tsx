import HexagramCard from '@/components/hexagram/HexagramCard'

interface ReadingHexagramsProps {
  originalHexagram: any
  mutantHexagram: any
  layout: 'stacked' | 'horizontal' | 'vertical'
}

export default function ReadingHexagrams({
  originalHexagram,
  mutantHexagram,
  layout,
}: ReadingHexagramsProps) {
  const layoutClass =
    layout === 'stacked'
      ? 'w-full grid grid-cols-1 gap-6'
      : layout === 'horizontal'
        ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-6'
        : 'flex-1 grid grid-cols-1 gap-6'

  return (
    <div className={layoutClass}>
      <HexagramCard title="Original" hexagram={originalHexagram} />
      <HexagramCard title="Mutante" hexagram={mutantHexagram} />
    </div>
  )
}
