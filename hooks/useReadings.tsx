import { useEffect, useState } from 'react'
import type { ReadingView } from '@/lib/readings/readingsTypes'
import { useAuth } from '@/context/AuthProvider'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export function useArchiveReadings() {
  const { isAuthenticated, loading: authLoading } = useAuth()

  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      setReadings([])
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const res = await fetch('/api/readings', { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao buscar leituras')
        const json = await res.json()
        const arr: ReadingView[] = json.data || []

        const validArr = arr
          .filter((r: ReadingView) => !!r.id)
          .sort((a: ReadingView, b: ReadingView) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
            return dateB - dateA
          })

        setReadings(validArr)
      } catch (err) {
        console.error(err)
        setReadings([])
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated, authLoading])

  // ⚙️ Apagar leitura localmente
  const deleteReading = (id: number) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
  }

  // ⚙️ Apagar leitura com confirmação (substitui useDeleteReading)
  const deleteReadingWithConfirm = async (
    id: number,
    onDelete?: (id: number) => void
  ) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Quer mesmo apagar esta leitura? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
    })

    if (!isConfirmed) return

    const res = await fetch(`/api/readings/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Leitura apagada com sucesso!')
      deleteReading(id)
      onDelete?.(id)
    } else {
      toast.error('Erro ao apagar leitura.')
    }
  }

  return { readings, loading, deleteReading, deleteReadingWithConfirm }
}
