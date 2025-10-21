import DOMPurify from 'dompurify'
import NotesEditor from '../reading/NotesEditor'

interface ReadingNotesProps {
  notes: string
  setNotes: (notes: string) => void
  isEditing: boolean
  layout: 'stacked' | 'horizontal' | 'vertical'
  onSave: () => void
}

export default function ReadingNotes({
  notes,
  setNotes,
  isEditing,
  layout,
  onSave,
}: ReadingNotesProps) {
  const wrapperClass =
    layout === 'vertical'
      ? 'w-full md:w-60 lg:w-75 xl:w-90 sticky top-6 self-start'
      : 'w-full'

  return (
    <div className={wrapperClass}>
      {isEditing ? (
        <NotesEditor
          notes={notes}
          setNotes={setNotes}
          onSave={onSave}
          layout={layout}
        />
      ) : (
        <div
          className="prose dark:prose-invert max-w-none w-full border p-2 rounded-md text-gray-800 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notes) }}
        />
      )}
    </div>
  )
}
