'use client'

import dynamic from 'next/dynamic'
import Button from '@/components/ui/button/Button'

const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
  ssr: false,
})

interface Props {
  notes: string
  setNotes: (value: string) => void
  onSave: () => void
  layout: 'stacked' | 'horizontal' | 'vertical'
}

export default function NotesEditor({
  notes,
  setNotes,
  onSave,
  layout,
}: Props) {
  const isVertical = layout === 'vertical'

  return (
    <div
      className={`
        w-full
        ${isVertical ? 'lg:w-96 xl:w-[28rem] lg:sticky lg:top-32 md:sticky md:top-28 h-min' : ''}
      `}
    >
      <TextEditor value={notes} onChange={setNotes} />
      <div className="mt-4 flex justify-center">
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
