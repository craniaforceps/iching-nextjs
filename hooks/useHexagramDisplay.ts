'use client'

// types and schemas
import { BinaryMatchOutput } from '@/lib/types/hexagramTypes'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

// hooks
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useHexagram } from './useHexagram'

// toast and alerts
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export function useHexagramDisplay() {
  const { generateHexagram: generateHexagramAPI } = useHexagram()
  const router = useRouter()

  const [hexagrams, setHexagrams] = useState<BinaryMatchOutput | null>(null)
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
    }
  }

  const handleSave = async () => {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    const res = await Swal.fire({
      title: 'Guardar leitura?',
      text: 'Desejas realmente guardar esta leitura?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, guardar',
      cancelButtonText: 'Cancelar',
    })

    if (!res.isConfirmed) return

    try {
      const meRes = await fetch('/api/me')
      const meJson = await meRes.json()

      if (!meJson.data?.user?.id) {
        toast.error('Não foi possível identificar o utilizador')
        return
      }

      const payload = {
        question,
        notes,
        originalBinary: hexagrams.match1.binary,
        mutantBinary: hexagrams.match2.binary,
        user_id: meJson.data.user.id,
      }

      const parsed = ReadingInputSchema.safeParse(payload)
      if (!parsed.success) {
        const errors = parsed.error.issues.map((i) => i.message).join(', ')
        toast.error('Erro na validação: ' + errors)
        return
      }

      const saveRes = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await saveRes.json()
      if (!json.success) throw new Error(json.error)

      toast.success('Leitura guardada com sucesso!')

      // Redireciona para a mesma página, "forçando refresh"
      router.push('/dashboard')
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
    setHexagrams,
  }
}
