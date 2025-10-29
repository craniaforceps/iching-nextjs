import AccordionItem from '@/components/ui/AccordionItem'
import ReadingHeader from './ReadingHeader'
import ReadingHexagrams from './ReadingHexagrams'
import ReadingNotes from './ReadingNotes'
import { useReadingNotes } from '@/hooks/useReadingNotes'
import { useArchiveReadings } from '@/hooks/useReadings'
import type { ReadingItemProps } from '@/lib/readings/readingsTypes'
import { useState, forwardRef } from 'react'
import ModeSelector from '../reading/ModeSelector'

const ReadingItem = forwardRef<HTMLDivElement, ReadingItemProps>(
  ({ reading, onDelete, isOpen, onToggle }, ref) => {
    const { notes, setNotes, isEditing, setIsEditing, saveNotes } =
      useReadingNotes(reading.id, reading.notes ?? '', isOpen)
    const { deleteReadingWithConfirm } = useArchiveReadings()
    const [layout, setLayout] = useState<'stacked' | 'horizontal' | 'vertical'>(
      'horizontal'
    )
    const date = reading.createdAt
      ? new Date(reading.createdAt).toLocaleString()
      : ''

    // Guardar valor original para comparação
    const originalNotes = reading.notes ?? ''

    // Estado do modal
    const [showDiscardModal, setShowDiscardModal] = useState(false)

    // Lógica do botão Edit
    const handleEditClick = () => {
      if (isEditing) {
        if (notes !== originalNotes) {
          // Alterações feitas → abrir modal
          setShowDiscardModal(true)
        } else {
          // Nenhuma alteração → fechar editor
          setIsEditing(false)
        }
      } else {
        // Editor fechado → abrir
        setIsEditing(true)
      }
    }

    return (
      <div ref={ref}>
        <AccordionItem
          title={
            <ReadingHeader
              question={reading.question}
              date={date}
              originalHexagram={reading.originalHexagram.unicode}
              mutantHexagram={reading.mutantHexagram.unicode}
              isOpen={isOpen}
              isEditing={isEditing}
              onToggle={onToggle}
              onEdit={handleEditClick}
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
            } min-h-[30vh]`}
          >
            {/* Hexagramas */}
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

        {/* Modal de descarte de alterações */}
        {showDiscardModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Descartar alterações?
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                Você tem alterações não salvas. Tem certeza que quer descartar a
                edição?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowDiscardModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    setIsEditing(false)
                    setNotes(originalNotes) // resetar notas
                    setShowDiscardModal(false)
                  }}
                >
                  Descartar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

ReadingItem.displayName = 'ReadingItem'
export default ReadingItem
