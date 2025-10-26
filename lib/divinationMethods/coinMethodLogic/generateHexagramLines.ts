import { getLineSymbol } from './getLineSymbol'
import { simulateCoinToss } from './simulateCoinToss'
import type { Line } from '@/lib/hexagram/hexagramTypes'

export const generateHexagramLines = (): Line[] => {
  const lines: Line[] = []

  for (let i = 0; i < 6; i++) {
    const tosses = [simulateCoinToss(), simulateCoinToss(), simulateCoinToss()]
    const sum = tosses.reduce((a, b) => a + b, 0)
    const symbol = getLineSymbol(sum)

    lines.push({ tosses, sum, symbol })
  }

  return lines
}
