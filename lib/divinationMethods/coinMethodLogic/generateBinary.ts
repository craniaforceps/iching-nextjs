import type { BinaryMatchInput } from '@/lib/hexagram/hexagramTypes'

// Gera os dois valores binários a partir do hexagrama bruto.
// O primeiro valor binário considera linhas yang (7 e 9) como 1, e yin (6 e 8) como 0.
// O segundo valor binário considera linhas yang (7 e 6) como 1, e yin (9 e 8) como 0.

export const generateBinary = (hexagramRaw: number[]): BinaryMatchInput => {
  const binary1 = hexagramRaw
    .map((value) => (value === 7 || value === 9 ? '1' : '0'))
    .join('')
  const binary2 = hexagramRaw
    .map((value) => (value === 6 || value === 7 ? '1' : '0'))
    .join('')
  return { binary1, binary2 }
}
