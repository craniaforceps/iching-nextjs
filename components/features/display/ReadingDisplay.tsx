'use client'

import dynamic from 'next/dynamic'
import Button from '../../ui/button/Button'
import HexagramCard from './HexagramCard'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'

const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
  ssr: false,
})

export default function HexagramDisplay() {
  const {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    error,
    buttonRef,
    handleGenerate,
    handleSave,
  } = useHexagramDisplay()

  const { match1, match2 } = hexagrams ?? {}

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6 not-prose"
      ref={buttonRef}
    >
      <label htmlFor="question" className="sr-only">
        Pergunta
      </label>

      <input
        id="question"
        type="text"
        placeholder="Escreve a tua pergunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-center">
        <Button text="Leitura" type="button" onClick={handleGenerate} />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {match1 && match2 && !error && (
        <div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <HexagramCard title="Original" hexagram={match1} />
            <HexagramCard title="Mutante" hexagram={match2} />
          </div>
          <div className="md:grid grid-cols-1">
            <div className="py-5 w-full justify-center">
              <TextEditor value={notes} onChange={setNotes} />
            </div>
            <div className="flex justify-center">
              <Button text="Guardar" type="button" onClick={handleSave} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
