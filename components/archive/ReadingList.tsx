import ReadingItem from './ReadingItem'
import type { ReadingListProps } from '@/lib/readings/readingsTypes'

// A lista de leituras no arquivo com itens expansíveis
export default function ReadingList({
  readings,
  openId,
  setOpenId,
  onDelete,
}: ReadingListProps) {
  return (
    <>
      {readings.map((reading) => (
        <ReadingItem
          key={reading.id}
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
