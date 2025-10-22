import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useHexagram } from './useHexagram'
import { useHexagramSaver } from './useHexagramSaver'
import type {
  BinaryMatchOutput,
  HexagramObject,
} from '@/lib/hexagram/hexagramTypes'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'

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
      const rawHexagrams = await generateHexagram()

      // ✅ Garantir que temos ambos os hexagramas
      if (!rawHexagrams.match1 || !rawHexagrams.match2) {
        throw new Error('Erro ao gerar hexagramas: dados incompletos')
      }

      // ✅ Converte os dados do servidor para HexagramObject
      const parsedHexagrams: BinaryMatchOutput = {
        match1: mapHexagramRow(rawHexagrams.match1 as any),
        match2: mapHexagramRow(rawHexagrams.match2 as any),
      }

      setHexagrams(parsedHexagrams)
      setError(null)

      // Scroll para botão (opcional)
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
