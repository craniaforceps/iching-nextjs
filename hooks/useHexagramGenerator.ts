'use client'

import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useHexagram } from './useHexagram'
import type { BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'

export function useHexagramGenerator() {
  const { generateHexagram } = useHexagram()
  const [hexagrams, setHexagrams] = useState<BinaryMatchOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async (question: string) => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }

    try {
      const newHexagrams = await generateHexagram()
      setHexagrams(newHexagrams)
      setError(null)

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

  return { hexagrams, setHexagrams, error, buttonRef, handleGenerate }
}
