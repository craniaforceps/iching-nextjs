'use client'

import { useState } from 'react'
import ReadingList from './ReadingList'
import PaginationControl from './PaginationControl'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'
import { useArchiveReadings } from '@/hooks/useReadings'

export default function ArchiveDisplay() {
  const { readings, loading, deleteReading } = useArchiveReadings()
  const [openId, setOpenId] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const itemsPerPage = 10
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedReadings = readings.slice(start, end)
  const totalPages = Math.ceil(readings.length / itemsPerPage)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {readings.length === 0 ? (
        <p className="text-center">Sem leituras.</p>
      ) : (
        <ReadingList
          readings={paginatedReadings}
          openId={openId}
          setOpenId={setOpenId}
          onDelete={deleteReading}
        />
      )}
      {totalPages > 1 && (
        <PaginationControl
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  )
}
