import { useState } from 'react'
import type { HexagramObject } from '@/lib/types/hexagramTypes'

export default function useHexagramSelection() {
  const [selectedHexagram, setSelectedHexagram] =
    useState<HexagramObject | null>(null)
  const [hoveredHexagram, setHoveredHexagram] = useState<HexagramObject | null>(
    null
  )

  return {
    selectedHexagram,
    setSelectedHexagram,
    hoveredHexagram,
    setHoveredHexagram,
  }
}
