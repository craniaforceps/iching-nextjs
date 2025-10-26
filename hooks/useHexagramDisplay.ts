'use client'

import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useHexagramSaver } from './useHexagramSaver'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { Line, BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'
import {
  simulateCoinToss,
  generateBinary,
} from '@/lib/divinationMethods/coinMethodLogic/client'
import { getLineSymbol } from '@/lib/divinationMethods/coinMethodLogic/getLineSymbol'

const generateLine = (): Line => {
  const tosses = [simulateCoinToss(), simulateCoinToss(), simulateCoinToss()]
  const sum = tosses.reduce((a, b) => a + b, 0)
  const symbol = getLineSymbol(sum)
  return { tosses, sum, symbol }
}

const generateHexagramLines = (): Line[] =>
  Array.from({ length: 6 }, () => generateLine())

export function useHexagramDisplay() {
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<Line[] | null>(null)
  const [hexagrams, setHexagrams] = useState<BinaryMatchOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const { handleSave } = useHexagramSaver({ hexagrams, question, notes })

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }

    try {
      // 1️⃣ Gera linhas detalhadas
      const rawLines = generateHexagramLines()
      setLines(rawLines)

      // 2️⃣ Converte para binários
      const sums = rawLines.map((l) => l.sum)
      const binaryMatch = generateBinary(sums)

      // 3️⃣ Chama a API route server-side
      const res = await fetch('/api/hexagram/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaryMatch),
      })
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)

      const data = await res.json()
      if (!data.success) throw new Error('Hexagrama não encontrado')

      // 4️⃣ Mapear para objetos frontend
      const parsedHexagrams: BinaryMatchOutput = {
        match1: mapHexagramRow(data.data.match1),
        match2: mapHexagramRow(data.data.match2),
      }

      setHexagrams(parsedHexagrams)
      setError(null)

      // Scroll opcional
      setTimeout(
        () => buttonRef.current?.scrollIntoView({ behavior: 'smooth' }),
        100
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
      toast.error(message)
    }
  }

  return {
    question,
    setQuestion,
    notes,
    setNotes,
    lines,
    hexagrams,
    error,
    buttonRef,
    handleGenerate,
    handleSave,
  }
}
