import type { HexagramObject } from '@/lib/types/hexagramTypes'

export async function handleHexagramClick(
  partialHexagram: { number: number },
  setSelectedHexagram: (hex: HexagramObject | null) => void
) {
  try {
    const res = await fetch(`/api/hexagram/${partialHexagram.number}`)
    if (!res.ok) throw new Error('Failed to fetch hexagram')
    const fullHexagram: HexagramObject = await res.json()
    setSelectedHexagram(fullHexagram)
  } catch (error) {
    console.error(error)
    setSelectedHexagram(null)
  }
}

export async function handleHexagramHover(
  hexagram: { number: number },
  setHoveredHexagram: (hexagram: HexagramObject | null) => void
) {
  try {
    const res = await fetch(`/api/hexagram/${hexagram.number}`)
    if (!res.ok) throw new Error('Failed to fetch hexagram')
    const data: HexagramObject = await res.json()
    setHoveredHexagram(data)
  } catch (error) {
    console.error(error)
    setHoveredHexagram(null)
  }
}

export const clearHexagramHover = (
  setHoveredHexagram: (hexagram: HexagramObject | null) => void
) => {
  setHoveredHexagram(null)
}
