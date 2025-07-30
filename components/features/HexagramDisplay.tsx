'use client'

import { useHexagram } from '@/hooks/useHexagram'
import HexagramCard from './HexagramCard'
import Button from '../ui/Button'
import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

const TextEditor = dynamic(() => import('@/components/ui/TextEditor'), {
  ssr: false,
})

export default function HexagramDisplay() {
  // Usar o hook
  const { hexagrams, error, generateHexagram } = useHexagram()

  // State dos inputs question e notes controlado pelo text editor
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')

  // useRef para smooth scrolling
  const buttonRef = useRef<HTMLDivElement>(null)

  // Botão que faz a geração de hexagramas
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

    if (!hexagrams.match1.binary || !hexagrams.match2.binary) {
      toast.error('Binary do hexagrama original ou mutante está em falta')
      return
    }

    const payload = {
      question,
      notes,
      originalBinary: hexagrams.match1.binary,
      mutantBinary: hexagrams.match2.binary,
      createdAt: new Date().toISOString(),
    }

    // Validar payload com zod (não inclui createdAt no esquema de input, então valide só os dados necessários)
    const parsed = ReadingInputSchema.safeParse({
      question: payload.question,
      notes: payload.notes,
      originalBinary: payload.originalBinary,
      mutantBinary: payload.mutantBinary,
    })

    if (!parsed.success) {
      // extrai mensagens dos erros
      const errors = parsed.error.issues
        .map((issue) => issue.message)
        .join(', ')
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
      console.log('Guardado com sucesso - vou mostrar toast')
      toast.success('Leitura guardada com sucesso!')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      toast.error('Erro ao guardar: ' + message)
    }
  }

  const { match1, match2 } = hexagrams ?? {}

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6 not-prose"
      ref={buttonRef}
    >
      {/* Label escondido para acessibilidade */}
      <label htmlFor="question" className="sr-only">
        Pergunta
      </label>

      {/* 1 – Pergunta */}
      <input
        id="question"
        type="text"
        placeholder="Escreve a tua pergunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 2 – Botão Leitura */}
      <Button text="Leitura" type="button" onClick={handleGenerate} />

      {/* Mensagem de erro */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 3 – Hexagramas e editor */}
      {match1 && match2 && !error && (
        <>
          <HexagramCard title="Original" hexagram={match1} />
          <HexagramCard title="Mutante" hexagram={match2} />

          <div className="py-5 w-full">
            <TextEditor value={notes} onChange={setNotes} />
          </div>

          {/* 4 – Guardar tudo */}
          <Button text="Guardar" type="button" onClick={handleSave} />
        </>
      )}
    </div>
  )
}
