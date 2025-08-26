// hooks/useReadings.ts
import { useEffect, useState } from 'react'
import type { ReadingView } from '@/lib/types/hexagramTypes'

export function useReadings() {
  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/readings', { credentials: 'include' })
        if (!res.ok) throw new Error('Fetch failed')
        const arr: ReadingView[] = await res.json()

        const validArr = arr
          .filter((r) => !!r.id)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

        if (validArr.length !== arr.length) {
          console.warn('Algumas leituras não têm ID definido!')
        }

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
