'use client'

import { Trash, Minus, Plus } from 'lucide-react'
import HexagramCard from './HexagramCard'
import type { ReadingItemProps } from '@/types/hexagram'

export default function ReadingItem({
  reading,
  onDelete,
  isOpen,
  onToggle,
}: ReadingItemProps) {
  const date = new Date(reading.createdAt).toLocaleString()

  const handleDelete = async () => {
    if (!confirm('Tens a certeza que queres apagar esta leitura?')) return

    const res = await fetch(`/api/readings/${reading.id}`, {
      method: 'DELETE',
    })

    if (res.ok) onDelete(reading.id)
    else alert('Erro ao apagar leitura.')
  }

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDelete()
  }

  return (
    <div className="border-transparent rounded-lg shadow-sm">
      {/* Cabeçalho clicável */}
      <div
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:text-amber-500 cursor-pointer"
        onClick={onToggle}
      >
        <div className="text-left">
          <div className="font-semibold">{reading.question}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{date}</div>
        </div>

        <div className="ml-4 flex gap-2 items-center">
          {/* Botão apagar (não propaga o click de abrir/fechar) */}
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleClickDelete}
            title="Apagar leitura"
          >
            <Trash size={18} />
          </button>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>

      {/* Conteúdo colapsável */}
      {isOpen && (
        <div className="p-4 space-y-6 bg-white dark:bg-gray-800">
          <HexagramCard title="Original" hexagram={reading.originalHexagram} />
          <HexagramCard title="Mutante" hexagram={reading.mutantHexagram} />
          <div>
            <h4 className="font-semibold mb-2">Notas</h4>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: reading.notes ?? '' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
