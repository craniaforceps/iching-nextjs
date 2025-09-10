import { findMatchingHexagrams } from '@/lib/divinationMethods/coinMethodLogic/server'

export async function getMatchingHexagrams(binaries: {
  binary1: string
  binary2: string
}) {
  const matches = await findMatchingHexagrams(binaries)
  if (!matches) {
    throw new Error('Hexagrama não encontrado')
  }
  return matches
}
