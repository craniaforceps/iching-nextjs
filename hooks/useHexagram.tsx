import { useState } from 'react'
import {
  generateBinary,
  findMatchingHexagrams,
  generateRawHexagram,
} from '@/lib/index'
import { HexagramObject } from '@/types/hexagram'

type HexagramMatches = {
  match1: HexagramObject
  match2: HexagramObject
}

export function useHexagram() {
  const [hexagrams, setHexagrams] = useState<HexagramMatches | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateHexagram = () => {
    const hexagram = generateRawHexagram()
    const binaries = generateBinary(hexagram)
    const matches = findMatchingHexagrams(binaries)

    if (matches) {
      setHexagrams(matches)
      setError(null)
    } else {
      setHexagrams(null)
      setError('Hexagrama não encontrado, tenta novamente.')
    }
  }

  return { hexagrams, error, generateHexagram }
}
