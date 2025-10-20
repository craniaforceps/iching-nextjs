'use client'

import { useState } from 'react'
import { BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'
import { generateBinary } from '@/lib/divinationMethods/coinMethodLogic/client'

export function useHexagramFromLines() {
  const [error, setError] = useState<string | null>(null)

  const generateHexagramFromLines = async (
    lines: number[]
  ): Promise<BinaryMatchOutput> => {
    try {
      const binaries = generateBinary(lines)

      const res = await fetch('/api/hexagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaries),
      })

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)

      const data = await res.json()
      if (!data.success) throw new Error('Hexagrama não encontrado')

      return { match1: data.data.match1, match2: data.data.match2 }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      throw err
    }
  }

  return { generateHexagramFromLines, error }
}
