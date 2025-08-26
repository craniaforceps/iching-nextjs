'use client'

import { useState } from 'react'
import { useReadings } from '@/hooks/useArchiveReadings'
import ReadingItem from './ReadingItem'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'

export default function ArchiveDisplay() {
  const { readings, loading, deleteReading } = useReadings()
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <LoadingSpinner />
        </div>
      ) : readings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No readings saved yet.
        </p>
      ) : (
        readings.map((reading) => (
          <ReadingItem
            key={reading.id}
            reading={reading}
            isOpen={reading.id === openId}
            onToggle={() =>
              setOpenId((prev) => (prev === reading.id ? null : reading.id))
            }
            onDelete={(id) => {
              deleteReading(id)
              if (openId === id) setOpenId(null)
            }}
          />
        ))
      )}
    </div>
  )
}
