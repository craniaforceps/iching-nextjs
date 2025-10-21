import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useHexagram } from './useHexagram'
import { useHexagramSaver } from './useHexagramSaver'
import type { BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'

export function useHexagramDisplay() {
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { generateHexagram } = useHexagram()
  const [hexagrams, setHexagrams] = useState<BinaryMatchOutput | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
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

  const { handleSave } = useHexagramSaver({ hexagrams, question, notes })

  return {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    setHexagrams,
    error,
    setError,
    buttonRef,
    handleGenerate,
    handleSave,
  }
}
