// hooks/useHexagramDisplay.ts
'use client'

import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'
import { useHexagram } from './useHexagram'
import { HexagramObject } from '@/lib/types/hexagramTypes'

interface HexagramPair {
  match1: HexagramObject
  match2: HexagramObject
}

export function useHexagramDisplay() {
  const { generateHexagram: generateHexagramAPI } = useHexagram()

  const [hexagrams, setHexagrams] = useState<HexagramPair | null>(null)
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }

    try {
      const newHexagrams = await generateHexagramAPI()
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
      // Não limpamos intencionalmente aqui para que o utilizador possa decidir
      // (mas podes descomentar a linha abaixo se preferires limpar automaticamente)
      // setHexagrams(null)
    }
  }

  const handleSave = async () => {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    try {
      const meRes = await fetch('/api/me')
      const meJson = await meRes.json()

      if (!meJson.user?.id) {
        toast.error('Não foi possível identificar o utilizador')
        return
      }

      const payload = {
        question,
        notes,
        originalBinary: hexagrams.match1.binary,
        mutantBinary: hexagrams.match2.binary,
        user_id: meJson.user.id,
      }

      const parsed = ReadingInputSchema.safeParse(payload)
      if (!parsed.success) {
        const errors = parsed.error.issues.map((i) => i.message).join(', ')
        toast.error('Erro na validação: ' + errors)
        return
      }

      const res = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      toast.success('Leitura guardada com sucesso!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      toast.error('Erro ao guardar: ' + message)
    }
  }

  return {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    error,
    buttonRef,
    handleGenerate,
    handleSave,
    setHexagrams, // exposto por se precisares de limpar manualmente
  }
}
