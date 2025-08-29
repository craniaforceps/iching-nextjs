'use client'

import { useState } from 'react'
import { HexagramObject } from '@/lib/types/hexagramTypes'
import {
  generateRawHexagram,
  generateBinary,
} from '@/lib/divinationMethods/coinMethodLogic/client'

type HexagramMatches = { match1: HexagramObject; match2: HexagramObject }

export function useHexagram() {
  const [error, setError] = useState<string | null>(null)

  const generateHexagram = async (): Promise<HexagramMatches> => {
    const hexagram = generateRawHexagram()
    const binaries = generateBinary(hexagram)

    try {
      const res = await fetch('/api/hexagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaries),
      })
      const data = await res.json()
      if (!data.success) throw new Error('Hexagrama não encontrado')
      return { match1: data.match1, match2: data.match2 }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      throw err
    }
  }

  return { generateHexagram, error }
}
