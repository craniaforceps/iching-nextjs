import { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export function useReadingNotes(
  readingId: string | number,
  initialNotes: string,
  isOpen: boolean
) {
  const [notes, setNotes] = useState(initialNotes)
  const [isEditing, setIsEditing] = useState(false)
  const wasOpen = useRef(isOpen)

  // Sincroniza notes se initialNotes mudar
  useEffect(() => {
    setNotes(initialNotes)
  }, [initialNotes])

  const saveNotes = async () => {
    try {
      const res = await fetch(`/api/readings/${readingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })

      if (res.ok) {
        toast.success('Notas atualizadas!')
        setIsEditing(false)
        // Reset do estado para que o modal não dispare
        wasOpen.current = false
        return true
      } else {
        toast.error('Erro ao atualizar notas.')
        return false
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao atualizar notas.')
      return false
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
    if (isConfirmed) await saveNotes()
  }

  useEffect(() => {
    // Só dispara se o item fechou, estava aberto, está em edição e há alterações
    if (
      wasOpen.current && // estava aberto
      !isOpen && // agora fechou
      isEditing && // estava em edição
      notes !== initialNotes // e há alterações
    ) {
      showCloseModal()
    }
    // Atualiza o estado de referência
    wasOpen.current = isOpen
  }, [isOpen, isEditing, notes, initialNotes])

  return { notes, setNotes, isEditing, setIsEditing, saveNotes }
}
