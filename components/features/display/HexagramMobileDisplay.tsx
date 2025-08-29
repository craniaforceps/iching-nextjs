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

export default function HexagramMobileDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
}: Props) {
  if (!hexagrams) return null

  return (
    <div className="flex flex-col gap-6 w-full">
      <HexagramCard title="Original" hexagram={hexagrams.match1} />
      <HexagramCard title="Mutante" hexagram={hexagrams.match2} />

      <TextEditor value={notes} onChange={setNotes} />
      <div className="flex justify-center">
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
