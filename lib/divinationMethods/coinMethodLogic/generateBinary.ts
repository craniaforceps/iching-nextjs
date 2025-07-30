import type { BinaryMatchInput } from '@/lib/types/hexagram'

export const generateBinary = (hexagramRaw: number[]): BinaryMatchInput => {
  const binary1 = hexagramRaw
    .map((value) => (value === 7 || value === 9 ? '1' : '0'))
    .join('')
  const binary2 = hexagramRaw
    .map((value) => (value === 6 || value === 7 ? '1' : '0'))
    .join('')
  return { binary1, binary2 }
}
