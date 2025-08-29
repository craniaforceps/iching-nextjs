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

export default function HexagramSideEditorDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
}: Props) {
  if (!hexagrams) return null

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full px-4 lg:px-0 max-w-6xl mx-auto">
      {/* Left: hexagrams */}
      <div className="flex-1 flex flex-col gap-6">
        <HexagramCard title="Original" hexagram={hexagrams.match1} />
        <HexagramCard title="Mutante" hexagram={hexagrams.match2} />

        {/* Mobile fallback */}
        <div className="lg:hidden flex flex-col gap-4">
          <TextEditor value={notes} onChange={setNotes} />
          <Button text="Guardar" type="button" onClick={onSave} />
        </div>
      </div>

      {/* Right sticky editor only for LG */}
      <div
        className="hidden lg:flex w-96 xl:w-[28rem] flex-col gap-4 sticky z-30 self-start"
        style={{ top: '10rem' }}
      >
        <TextEditor value={notes} onChange={setNotes} />
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
