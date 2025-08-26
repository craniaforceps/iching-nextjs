'use client'

import { Trash, Minus, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import HexagramCard from '@/components/features/display/HexagramCard'
import type { ReadingItemProps } from '@/lib/types/hexagramTypes'
import Swal from 'sweetalert2'
import DOMPurify from 'dompurify'

export default function ReadingItem({
  reading,
  onDelete,
  isOpen,
  onToggle,
}: ReadingItemProps) {
  const date = new Date(reading.createdAt).toLocaleString()

  // Apaga da base de dados
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Quer mesmo apagar esta leitura? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    const res = await fetch(`/api/readings/${reading.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success('Leitura apagada com sucesso!')
      onDelete(reading.id)
    } else {
      toast.error('Erro ao apagar leitura.')
    }
  }

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDelete()
  }

  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
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

      {/* Conteúdo colapsável (sempre presente no DOM, animado via CSS) */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 w-full ${
          isOpen ? 'p-4' : 'max-h-0 p-0'
        }`}
      >
        <div className="space-y-6 w-full">
          <HexagramCard title="Original" hexagram={reading.originalHexagram} />
          <HexagramCard title="Mutante" hexagram={reading.mutantHexagram} />
          <div>
            <h4 className="font-semibold mb-2">Notas</h4>
            <div
              className="prose dark:prose-invert max-w-none w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(reading.notes ?? ''),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
