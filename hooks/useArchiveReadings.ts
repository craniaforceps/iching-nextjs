// hooks/useReadings.ts
import { useEffect, useState } from 'react'
import type { ReadingView } from '@/lib/readings/readingsTypes'
import { useAuth } from '@/context/AuthProvider'

// Hook personalizado para gerir leituras arquivadas do utilizador
export function useArchiveReadings() {
  const { isAuthenticated, loading: authLoading } = useAuth()

  // Estados para leituras e estado de carregamento
  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)

  // Efeito para buscar leituras quando o utilizador está autenticado
  useEffect(() => {
    if (authLoading) return // ainda a verificar auth
    if (!isAuthenticated) {
      // se não houver sessão, limpar leituras
      setReadings([])
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const res = await fetch('/api/readings', { credentials: 'include' })
        if (!res.ok) throw new Error('Fetch failed')
        const json = await res.json()
        const arr: ReadingView[] = json.data

        const validArr = arr
          .filter((r) => !!r.id)
          .sort((a, b) => {
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

  // Função para apagar leitura
  const deleteReading = (id: number) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
  }

  return { readings, loading, deleteReading }
}
