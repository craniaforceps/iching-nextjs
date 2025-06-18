import type { BinaryMatchInput, BinaryMatchOutput } from './../types/hexagram.d'
import { hexagramsData } from '@/data/data'

export const findMatchingHexagrams = ({
  binary1,
  binary2,
}: BinaryMatchInput): BinaryMatchOutput | null => {
  const match1 = hexagramsData.find((hex) => hex.binary === binary1)
  const match2 = hexagramsData.find((hex) => hex.binary === binary2)

  if (!match1 || !match2) {
    return null
  }
  return { match1, match2 }
}
