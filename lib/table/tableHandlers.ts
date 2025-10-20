import type { HexagramObject } from '@/lib/hexagram/hexagramTypes'

export async function handleHexagramClick(
  hexagramNumber: { number: number },
  setSelectedHexagram: (hex: HexagramObject | null) => void
) {
  try {
    const res = await fetch(`/api/hexagram/${hexagramNumber.number}`)
    const json = await res.json()

    if (!res.ok || !json.success)
      throw new Error(json.error || 'Failed to fetch hexagram')

    const fullHexagram: HexagramObject = json.data
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
    const json = await res.json()

    if (!res.ok || !json.success)
      throw new Error(json.error || 'Failed to fetch hexagram')

    const data: HexagramObject = json.data
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
