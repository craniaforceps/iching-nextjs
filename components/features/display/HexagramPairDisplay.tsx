'use client'

import dynamic from 'next/dynamic'
import HexagramCard from './HexagramCard'
import Button from '../../ui/button/Button'
import { HexagramObject } from '@/lib/types/hexagramTypes'

const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
  ssr: false,
})

interface Props {
  hexagrams: { match1: HexagramObject; match2: HexagramObject } | null
  notes: string
  setNotes: (value: string) => void
  onSave: () => void
}

export default function HexagramPairDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
}: Props) {
  if (!hexagrams) return null

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HexagramCard title="Original" hexagram={hexagrams.match1} />
        <HexagramCard title="Mutante" hexagram={hexagrams.match2} />
      </div>

      <TextEditor value={notes} onChange={setNotes} />
      <div className="flex justify-center">
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
