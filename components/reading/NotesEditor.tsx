'use client'

import Button from '@/components/ui/button/Button'
import TextEditor from '@/components/ui/editor/TextEditor'

type Props = {
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
        ${isVertical ? 'lg:w-96 xl:w-92 lg:sticky lg:top-32 md:sticky md:top-28 h-min' : ''}
      `}
    >
      <TextEditor
        value={notes}
        onChange={setNotes}
        placeholder="Escreve as tuas notas…"
      />
      <div className="mt-4 flex justify-center p-2">
        <Button text="Guardar" type="button" onClick={onSave} />
      </div>
    </div>
  )
}
