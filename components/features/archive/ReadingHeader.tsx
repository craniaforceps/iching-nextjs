import { Trash, Minus, Plus, Edit2 } from 'lucide-react'

interface ReadingHeaderProps {
  question: string
  date: string
  originalHexagram: string
  mutantHexagram: string
  isOpen: boolean
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}

export default function ReadingHeader({
  question,
  date,
  originalHexagram,
  mutantHexagram,
  isOpen,
  onEdit,
  onDelete,
  onToggle,
}: ReadingHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-left">
        <div className="font-semibold text-sm lg:text-base">{question}</div>
        <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          {date} - {originalHexagram} {mutantHexagram}
        </div>
      </div>
      <div className="ml-4 flex gap-2 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          title="Apagar leitura"
          className="cursor-pointer hover:text-red-500"
        >
          <Trash size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          title="Editar notas"
          className="cursor-pointer hover:text-amber-500"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onToggle}
          className="cursor-pointer  hover:text-amber-500"
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </button>
      </div>
    </div>
  )
}
