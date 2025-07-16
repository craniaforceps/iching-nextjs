'use client'

import { useEffect, useState } from 'react'
import ReadingItem from './ReadingItem'
import type { Reading } from '@/types/hexagram'

export default function ArchiveDisplay() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/readings')
        if (!res.ok) throw new Error('Fetch failed')
        const arr: Reading[] = await res.json()

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

  const handleDelete = (id: string) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
    if (openId === id) setOpenId(null)
  }

  if (loading) return <p>Loading...</p>

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
