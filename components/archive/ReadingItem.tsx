import AccordionItem from '@/components/ui/AccordionItem'
import ReadingHeader from './ReadingHeader'
import ReadingHexagrams from './ReadingHexagrams'
import ReadingNotes from './ReadingNotes'
import { useReadingNotes } from '@/hooks/useReadingNotes'
import { useArchiveReadings } from '@/hooks/useReadings'
import type { ReadingItemProps } from '@/lib/readings/readingsTypes'
import { useState } from 'react'
import ModeSelector from '../reading/ModeSelector'

export default function ReadingItem({
  reading,
  onDelete,
  isOpen,
  onToggle,
}: ReadingItemProps) {
  const { notes, setNotes, isEditing, setIsEditing, saveNotes } =
    useReadingNotes(reading.id, reading.notes ?? '', isOpen)
  const { deleteReadingWithConfirm } = useArchiveReadings()
  const [layout, setLayout] = useState<'stacked' | 'horizontal' | 'vertical'>(
    'horizontal'
  )
  const date = reading.createdAt
    ? new Date(reading.createdAt).toLocaleString()
    : ''

  return (
    <AccordionItem
      title={
        <ReadingHeader
          question={reading.question}
          date={date}
          originalHexagram={reading.originalHexagram.unicode}
          mutantHexagram={reading.mutantHexagram.unicode}
          isOpen={isOpen}
          onToggle={onToggle}
          onEdit={() => setIsEditing(true)}
          onDelete={() => deleteReadingWithConfirm(reading.id, onDelete)}
        />
      }
      isOpen={isOpen}
      onToggle={onToggle}
    >
      {/* Mode selector */}
      <ModeSelector userMode={layout} setUserMode={setLayout} />

      {/* Container flex cards + notes */}
      <div
        className={`flex flex-col gap-6 ${
          layout === 'vertical' ? 'md:flex-row' : 'flex-col'
        } min-h-[30vh]`} // altura mínima para sticky
      >
        {/* Hexagramas - scrollável no vertical */}
        <div
          className={`flex-1 grid grid-cols-1 gap-6 ${
            layout === 'vertical'
              ? 'overflow-auto max-h-[calc(100vh-10rem)]'
              : ''
          }`}
        >
          <ReadingHexagrams
            originalHexagram={reading.originalHexagram}
            mutantHexagram={reading.mutantHexagram}
            layout={layout}
          />
        </div>

        {/* Notes sticky */}
        <ReadingNotes
          notes={notes}
          setNotes={setNotes}
          isEditing={isEditing}
          layout={layout}
          onSave={saveNotes}
        />
      </div>
    </AccordionItem>
  )
}
