// hooks/useHexagramDisplay.ts
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'
import { useHexagram } from './useHexagram'

export function useHexagramDisplay() {
  const { hexagrams, error, generateHexagram } = useHexagram()
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }
    generateHexagram()
    setNotes('') // limpa notas anteriores
    setTimeout(
      () => buttonRef.current?.scrollIntoView({ behavior: 'smooth' }),
      100
    )
  }

  async function handleSave() {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    const meRes = await fetch('/api/me')
    const meJson = await meRes.json()

    if (!meJson.user || !meJson.user.id) {
      toast.error('Não foi possível identificar o utilizador')
      return
    }

    const userId = meJson.user.id

    const payload = {
      question,
      notes,
      originalBinary: hexagrams.match1.binary,
      mutantBinary: hexagrams.match2.binary,
      user_id: userId,
    }

    const parsed = ReadingInputSchema.safeParse(payload)

    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(', ')
      toast.error('Erro na validação: ' + errors)
      return
    }

    try {
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
  }
}
