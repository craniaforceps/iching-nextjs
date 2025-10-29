import ReadingItem from './ReadingItem'
import type { ReadingListProps } from '@/lib/readings/readingsTypes'
import { useRef, useEffect } from 'react'

// A lista de leituras no arquivo com itens expansíveis
export default function ReadingList({
  readings,
  openId,
  setOpenId,
  onDelete,
}: ReadingListProps) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (openId && itemRefs.current[openId]) {
      const el = itemRefs.current[openId]
      if (!el) return

      const headerOffset = 80 // altura do header sticky em px
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [openId])

  return (
    <>
      {readings.map((reading) => (
        <ReadingItem
          key={reading.id}
          ref={(el) => {
            itemRefs.current[reading.id] = el
          }}
          reading={reading}
          isOpen={reading.id === openId}
          onToggle={() => setOpenId(openId === reading.id ? null : reading.id)}
          onDelete={(id) => {
            onDelete(id)
            if (openId === id) setOpenId(null)
          }}
        />
      ))}
    </>
  )
}
