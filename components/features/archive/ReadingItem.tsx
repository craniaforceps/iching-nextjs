'use client'

import { Trash, Minus, Plus, Edit2 } from 'lucide-react'
import { toast } from 'react-toastify'
import HexagramCard from '@/components/features/display/HexagramCard'
import NotesEditor from '@/components/features/display/NotesEditor'
import type { ReadingItemProps } from '@/lib/types/hexagramTypes'
import Swal from 'sweetalert2'
import { useState, useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'
import AccordionItem from '@/components/ui/AccordionItem' // Importar AccordionItem

export default function ReadingItem({
  reading,
  onDelete,
  isOpen,
  onToggle,
}: ReadingItemProps) {
  const date = reading.createdAt
    ? new Date(reading.createdAt).toLocaleString()
    : ''

  const [isEditing, setIsEditing] = useState(false)
  const [layout, setLayout] = useState<'stacked' | 'horizontal' | 'vertical'>(
    'horizontal'
  )
  const [notes, setNotes] = useState(reading.notes ?? '')

  const wasOpen = useRef(isOpen)

  // Apagar leitura
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

    const res = await fetch(`/api/readings/${reading.id}`, { method: 'DELETE' })
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

  const handleSaveNotes = async () => {
    const res = await fetch(`/api/readings/${reading.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    })
    if (res.ok) {
      toast.success('Notas atualizadas!')
      setIsEditing(false)
    } else {
      toast.error('Erro ao atualizar notas.')
    }
  }

  const showCloseModal = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Notas não guardadas!',
      text: 'Deseja guardar as alterações antes de fechar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Descartar',
    })

    if (isConfirmed) await handleSaveNotes()
  }

  useEffect(() => {
    if (wasOpen.current && !isOpen && isEditing) {
      showCloseModal()
    }
    wasOpen.current = isOpen
  }, [isOpen])

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isOpen) onToggle()
    setIsEditing(true)
  }

  return (
    <AccordionItem
      title={
        <div className="flex justify-between items-center w-full">
          <div className="text-left">
            <div className="font-semibold text-sm lg:text-base">
              {reading.question}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              {date} - {reading.originalHexagram.unicode}{' '}
              {reading.mutantHexagram.unicode}
            </div>
          </div>
          <div className="ml-4 flex gap-2 items-center">
            <button onClick={handleClickDelete} title="Apagar leitura">
              <Trash size={18} />
            </button>
            <button onClick={handleEditClick} title="Editar notas">
              <Edit2 size={18} />
            </button>
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </div>
      }
      isOpen={isOpen}
      onToggle={onToggle}
    >
      {/* Botões de layout md+ */}
      <div className="hidden md:flex flex-wrap gap-2 justify-center mb-4">
        {['stacked', 'horizontal', 'vertical'].map((m) => (
          <button
            key={m}
            type="button"
            className="cursor-pointer px-2 py-1 text-xs border rounded text-black dark:text-white hover:bg-amber-500"
            onClick={() => setLayout(m as typeof layout)}
          >
            {m === 'stacked'
              ? 'Empilhado'
              : m === 'horizontal'
                ? 'Horizontal'
                : 'Vertical'}
          </button>
        ))}
      </div>

      {/* Hexagramas e notas */}
      <div
        className={`flex flex-col gap-6 ${layout === 'vertical' ? 'md:flex-row' : 'flex-col'}`}
      >
        <div
          className={`
            ${layout === 'stacked' ? 'w-full grid grid-cols-1 gap-6' : ''}
            ${layout === 'horizontal' ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-6' : ''}
            ${layout === 'vertical' ? 'flex-1 grid grid-cols-1 gap-6' : ''}
          `}
        >
          <HexagramCard title="Original" hexagram={reading.originalHexagram} />
          <HexagramCard title="Mutante" hexagram={reading.mutantHexagram} />
        </div>

        <div
          className={`${layout === 'vertical' ? 'w-full md:w-60 lg:w-90 xl:w-[28rem] sticky md:top-28 lg:top-28 h-min' : 'w-full'}`}
        >
          {isEditing ? (
            <NotesEditor
              notes={notes}
              setNotes={setNotes}
              onSave={handleSaveNotes}
              layout={layout}
            />
          ) : (
            <div
              className="prose dark:prose-invert max-w-none w-full border p-2 rounded-md text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notes) }}
            />
          )}
        </div>
      </div>
    </AccordionItem>
  )
}
