'use client'

import { useHexagram } from '@/hooks/useHexagram'
import HexagramCard from './HexagramCard'
import Button from './Button'
import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

const TextEditor = dynamic(() => import('@/components/ui/TextEditor'), {
  ssr: false,
})

export default function HexagramDisplay() {
  const { hexagrams, error, generateHexagram } = useHexagram()
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('') // controlled by TextEditor
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
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
    if (!hexagrams?.match1 || !hexagrams?.match2) return

    const payload = {
      question,
      notes,
      originalHexagram: hexagrams.match1,
      mutantHexagram: hexagrams.match2,
      createdAt: new Date().toISOString(),
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
    } catch (err: any) {
      toast.error('Erro ao guardar: ' + err.message)
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
