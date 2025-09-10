// hooks/useReadings.ts
import { useEffect, useState } from 'react'
import type { ReadingView } from '@/lib/types/hexagramTypes'

export function useArchiveReadings() {
  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const deleteReading = (id: number) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
  }

  return { readings, loading, deleteReading }
}
