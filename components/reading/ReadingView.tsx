'use client'

import clsx from 'clsx'
import ReadingHexagrams from '../archive/ReadingHexagrams'
import ReadingNotes from '../archive/ReadingNotes'
import ReadingLogs from './ReadingLogs'
import type { ReadingView } from '@/lib/readings/readingsTypes'

interface ReadingViewProps {
  reading: ReadingView
  layout: 'stacked' | 'horizontal' | 'vertical'
  isEditing?: boolean
  notes: string
  setNotes: (v: string) => void
  onSaveNotes?: () => void
  showLogs?: boolean
  editable?: boolean
}

export default function ReadingView({
  reading,
  layout,
  isEditing = false,
  notes,
  setNotes,
  onSaveNotes,
  showLogs = false,
  editable = true,
}: ReadingViewProps) {
  const shouldShowLogs =
    showLogs || reading.lines?.length === 6 || !!reading.hexagramRaw

  // 🔹 fallback para lines
  const linesForLogs =
    reading.lines && reading.lines.length === 6
      ? reading.lines
      : (reading.hexagramRaw?.split('').map((v) => {
          const num = Number(v)
          const symbol =
            num === 6
              ? '━━x━━'
              : num === 7
                ? '━━━━━'
                : num === 8
                  ? '━━ ━━'
                  : num === 9
                    ? '━━o━━'
                    : '?'
          return { tosses: [], sum: num, symbol }
        }) ?? [])

  const isVertical = layout === 'vertical'
  const isHorizontal = layout === 'horizontal'
  const isStacked = layout === 'stacked'

  // 🔹 Disposição do conjunto (grelha/colunas)
  const hexagramWrapper = clsx('w-full mx-auto gap-6 justify-items-center', {
    'grid grid-cols-1': isStacked,
    'grid md:grid-cols-2 max-w-5xl': isHorizontal,
    'flex-1 grid grid-cols-1 overflow-auto max-h-[calc(100vh-8rem)]':
      isVertical,
  })

  const notesWrapper = clsx('w-full', {
    'md:w-60 lg:w-80 xl:w-96 sticky top-28': isVertical,
  })

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 🔹 Logs sempre no topo */}
      {shouldShowLogs && (
        <ReadingLogs lines={linesForLogs} hexagramRaw={reading.hexagramRaw} />
      )}

      {/* 🔹 Conteúdo principal */}
      <div className={clsx('flex flex-col gap-6', isVertical && 'md:flex-row')}>
        {/* 🔹 Hexagramas */}
        <div className={hexagramWrapper}>
          <ReadingHexagrams
            originalHexagram={reading.originalHexagram}
            mutantHexagram={reading.mutantHexagram}
          />
        </div>

        {/* 🔹 Notas */}
        <div className={notesWrapper}>
          <ReadingNotes
            notes={notes}
            setNotes={setNotes}
            isEditing={isEditing}
            layout={layout}
            onSave={onSaveNotes}
          />
        </div>
      </div>
    </div>
  )
}
