import { useState } from 'react'
import {
  generateRawHexagram,
  generateBinary,
} from '@/lib/divinationMethods/coinMethodLogic/client'

import { HexagramObject } from '@/lib/types/hexagramTypes'

type HexagramMatches = {
  match1: HexagramObject
  match2: HexagramObject
}

export function useHexagram() {
  const [hexagrams, setHexagrams] = useState<HexagramMatches | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateHexagram = async () => {
    const hexagram = generateRawHexagram()
    const binaries = generateBinary(hexagram)

    try {
      const res = await fetch('/api/hexagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaries),
      })

      const data = await res.json()

      if (!data.success) {
        setHexagrams(null)
        setError('Hexagrama não encontrado, tenta novamente.')
      } else {
        setHexagrams({ match1: data.match1, match2: data.match2 })
        setError(null)
      }
    } catch (err: unknown) {
      console.log(err)
      setHexagrams(null)
      setError('Erro ao buscar hexagramas.')
    }
  }

  return { hexagrams, error, generateHexagram }
}
