'use client'

import dynamic from 'next/dynamic'
import HexagramCard from './HexagramCard'
import Button from '@/components/ui/button/Button'
import { HexagramObject } from '@/lib/types/hexagramTypes'

const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
  ssr: false,
})

interface Props {
  hexagrams: { match1: HexagramObject; match2: HexagramObject }
  notes: string
  setNotes: (value: string) => void
  onSave: () => void
  layout: 'stacked' | 'horizontal' | 'vertical'
}

export default function HexagramDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
  layout,
}: Props) {
  const isVertical = layout === 'vertical'
  const isHorizontal = layout === 'horizontal'
  const isStacked = layout === 'stacked'

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Container cards + editor */}
      <div className={`flex flex-col ${isVertical ? 'md:flex-row' : ''} gap-6`}>
        {/* Hexagramas */}
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

        {/* Editor */}
        <div
          className={`
            ${isStacked || isHorizontal ? 'w-full' : ''}
            ${isVertical ? 'w-full md:w-60 lg:w-90 xl:w-[28rem] sticky md:top-28 lg:top-28 h-min' : ''}
          `}
        >
          <TextEditor value={notes} onChange={setNotes} />
          <div className="mt-4 flex justify-center">
            <Button text="Guardar" type="button" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  )
}
