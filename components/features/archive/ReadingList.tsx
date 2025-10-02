import ReadingItem from './ReadingItem'
import { ReadingView } from '@/lib/types/hexagramTypes'

interface ReadingListProps {
  readings: ReadingView[]
  openId: number | null
  setOpenId: (id: number | null) => void
  onDelete: (id: number) => void
}

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
