import { useState } from 'react'
import {
  generateRawHexagram,
  generateBinary,
} from '@/lib/divinationMethods/coinMethodLogic/client'
import type { BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'

async function fetchHexagram(lines?: number[]): Promise<BinaryMatchOutput> {
  const binaries = lines
    ? generateBinary(lines)
    : generateBinary(generateRawHexagram())

  const res = await fetch('/api/hexagram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(binaries),
  })

  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)

  const data = await res.json()
  console.log('Response from API:', data)

  if (!data.success) throw new Error('Hexagrama não encontrado')

  // 🧠 Normaliza os campos para garantir que o frontend usa sempre "unicode"
  const normalize = (hex: any) =>
    hex
      ? {
          ...hex,
          unicode: hex.unicode_hexagram || hex.unicode || null,
        }
      : null

  return {
    match1: normalize(data.data.match1),
    match2: normalize(data.data.match2),
  }
}

export function useHexagram() {
  const [error, setError] = useState<string | null>(null)

  const generateHexagram = async (): Promise<BinaryMatchOutput> => {
    try {
      return await fetchHexagram()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      throw err
    }
  }

  const generateHexagramFromLines = async (
    lines: number[]
  ): Promise<BinaryMatchOutput> => {
    try {
      return await fetchHexagram(lines)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      throw err
    }
  }

  return { generateHexagram, generateHexagramFromLines, error }
}
