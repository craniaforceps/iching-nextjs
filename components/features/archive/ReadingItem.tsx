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
        className="w-full flex justify-between items-center px-4 py-2 hover:text-amber-500 cursor-pointer"
        onClick={onToggle}
      >
        <div className="text-left">
          <div className="font-semibold text-sm lg:text-base ">
            {reading.question}
          </div>
          <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
            {date} - {reading.originalHexagram.unicode}{' '}
            {reading.mutantHexagram.unicode}
          </div>
          {/* <div className="lg:text-base text-sm text-gray-600 dark:text-gray-400 ">
            {reading.originalHexagram.unicode} {reading.mutantHexagram.unicode}
          </div> */}
        </div>

        <div className="ml-4 flex gap-2 items-center">
          <button
            className=" hover:text-red-500"
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
        className={`transition-all duration-300 overflow-hidden  w-full ${
          isOpen ? 'p-4' : 'max-h-0 p-0'
        }`}
      >
        {/* Original + Mutante + Notas */}
        <div className="">
          {' '}
          <div className="space-y-6 w-full md:grid md:grid-cols-2 md:gap-4">
            <HexagramCard
              title="Original"
              hexagram={reading.originalHexagram}
            />
            <HexagramCard title="Mutante" hexagram={reading.mutantHexagram} />
          </div>
          <div className="w-full ">
            <h4 className="font-semibold mb-2">Notas</h4>
            <div
              className="prose dark:prose-invert max-w-none w-full mx-auto items-center justify-center"
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
