'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useHexagramSaver } from './useHexagramSaver'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type {
  Line,
  BinaryMatchHexagramRawOutput,
} from '@/lib/hexagram/hexagramTypes'
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
  const [hexagrams, setHexagrams] =
    useState<BinaryMatchHexagramRawOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hexagramRaw, setHexagramRaw] = useState<string | null>(null)

  const { handleSave } = useHexagramSaver({ hexagrams, question, notes })

  // 🔹 Recupera leitura guest do localStorage no mount
  useEffect(() => {
    const guestReading = localStorage.getItem('guestReading')
    if (guestReading) {
      const data = JSON.parse(guestReading)

      // comentado para não limpar o localStorage

      // setNotes(data.notes ?? '')
      // setLines(data.lines ?? null)
      // setHexagrams(data.hexagrams ?? null)
    }
  }, [])

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }

    try {
      const rawLines = generateHexagramLines()
      setLines(rawLines)

      const sums = rawLines.map((l) => l.sum)
      const binaryMatch = generateBinary(sums)
      const hexagramRaw = sums.join('')

      const res = await fetch('/api/hexagram/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaryMatch),
      })

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
      const data = await res.json()
      if (!data.success) throw new Error('Hexagrama não encontrado')

      const parsedHexagrams: BinaryMatchHexagramRawOutput = {
        match1: mapHexagramRow(data.data.match1),
        match2: mapHexagramRow(data.data.match2),
        hexagramRaw,
      }

      setHexagrams(parsedHexagrams)
      setHexagramRaw(hexagramRaw)
      setError(null)

      // 🔹 Salvar automaticamente no localStorage como guest
      localStorage.setItem(
        'guestReading',
        JSON.stringify({
          question,
          notes,
          lines: rawLines,
          hexagrams: parsedHexagrams,
        })
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
    hexagramRaw,
    error,
    handleGenerate,
    handleSave,
  }
}
