import HexagramCard from '@/components/hexagram/HexagramCard'

interface ReadingHexagramsProps {
  originalHexagram: any
  mutantHexagram: any
}

export default function ReadingHexagrams({
  originalHexagram,
  mutantHexagram,
}: ReadingHexagramsProps) {
  return (
    <>
      <HexagramCard title="Original" hexagram={originalHexagram} />
      <HexagramCard title="Mutante" hexagram={mutantHexagram} />
    </>
  )
}
