import dynamic from 'next/dynamic'
import clsx from 'clsx'
import HexagramCard from './HexagramCard'
import Button from '@/components/ui/button/Button'
import { HexagramDisplayProps } from '@/lib/hexagram/hexagramTypes'

const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
  ssr: false,
})

export default function HexagramDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
  layout, // stacked | horizontal | vertical
}: HexagramDisplayProps) {
  console.log('Hexagrams in display:', hexagrams)
  const isVertical = layout === 'vertical'
  const isHorizontal = layout === 'horizontal'
  const isStacked = layout === 'stacked'

  const cardsClasses = clsx('w-full', {
    'grid grid-cols-1 gap-6': isStacked,
    'grid grid-cols-1 md:grid-cols-2 gap-6': isHorizontal,
    'flex-1 grid grid-cols-1 gap-6 overflow-auto max-h-[calc(100vh-8rem)]':
      isVertical,
    // overflow-auto garante scroll nos cards para sticky funcionar
  })

  const editorClasses = clsx('w-full', {
    'md:w-60 lg:w-80 xl:w-96 sticky top-28 ': isVertical,
  })

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className={clsx(
          'flex flex-col gap-6 min-h-[calc(100vh-6rem)]', // altura mínima para scroll
          isVertical && 'md:flex-row'
        )}
      >
        {/* Hexagramas */}
        <div className={cardsClasses}>
          <HexagramCard title="Original" hexagram={hexagrams.match1} />
          <HexagramCard title="Mutante" hexagram={hexagrams.match2} />
        </div>

        {/* Editor sticky */}
        <div className={editorClasses}>
          <TextEditor value={notes} onChange={setNotes} aria-label="Notas" />
          <div className="mt-4 flex justify-center">
            <Button text="Guardar" type="button" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  )
}
