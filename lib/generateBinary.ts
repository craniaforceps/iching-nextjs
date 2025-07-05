import type { BinaryResult } from '../types/hexagram'

export const generateBinary = (hexagramRaw: number[]): BinaryResult => {
  const binary1 = hexagramRaw
    .map((value) => (value === 7 || value === 9 ? '1' : '0'))
    .join('')
  const binary2 = hexagramRaw
    .map((value) => (value === 6 || value === 7 ? '1' : '0'))
    .join('')
  return { binary1, binary2 }
}
