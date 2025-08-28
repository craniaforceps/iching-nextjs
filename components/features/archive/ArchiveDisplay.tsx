'use client'

import { useState } from 'react'
import { useReadings } from '@/hooks/useArchiveReadings'
import ReadingItem from './ReadingItem'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'

export default function ArchiveDisplay() {
  const { readings, loading, deleteReading } = useReadings()

  const [openId, setOpenId] = useState<number | null>(null)

  // estado para paginação
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // cálculos de paginação
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedReadings = readings.slice(start, end)
  const totalPages = Math.ceil(readings.length / itemsPerPage)

  return (
    <div className="w-full space-y-2">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingSpinner />
        </div>
      ) : readings.length === 0 ? (
        <p className="text-center">Sem leituras.</p>
      ) : (
        <>
          {paginatedReadings.map((reading) => (
            <ReadingItem
              key={reading.id}
              reading={reading}
              isOpen={reading.id === openId}
              onToggle={() =>
                setOpenId(openId === reading.id ? null : reading.id)
              }
              onDelete={(id) => {
                deleteReading(id)
                if (openId === id) setOpenId(null)
              }}
            />
          ))}

          {/* Controlo de paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Seguinte
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
