'use client'

import { useEffect, useState } from 'react'
import ReadingItem from './ReadingItem'
import type { ReadingView } from '@/lib/types/hexagram'

export default function ArchiveDisplay() {
  // States
  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  // Corre o fetch quando é montado
  useEffect(() => {
    ;(async () => {
      try {
        // Faz o get implicito
        const res = await fetch('/api/readings')
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

  // Apaga no frontend - em ReadingItem apaga da base de dados
  const handleDelete = (id: string) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
    if (openId === id) setOpenId(null)
  }

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loader" />
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-4">
      <h1 className="text-3xl font-bold text-center">My Archive</h1>

      {readings.length === 0 ? (
        <p className="text-center text-gray-500">No readings saved yet.</p>
      ) : (
        readings.map((reading) => (
          <ReadingItem
            key={reading.id}
            reading={reading}
            isOpen={reading.id === openId}
            onToggle={() =>
              setOpenId((prev) => (prev === reading.id ? null : reading.id))
            }
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  )
}
