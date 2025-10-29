'use client'

import { useRef, useEffect, useState } from 'react'
import Button from '@/components/ui/button/Button'

type ReadingInputProps = {
  question: string
  setQuestion: (q: string) => void
  onGenerate: () => Promise<void>
  isGenerating: boolean
  error?: string
  maxLength?: number
}

export default function ReadingInput({
  question,
  setQuestion,
  onGenerate,
  isGenerating,
  error,
  maxLength = 100,
}: ReadingInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [triggerScroll, setTriggerScroll] = useState(false)

  const handleClick = async () => {
    await onGenerate() // aguarda a geração
    setTriggerScroll(true) // sinaliza que podemos scrollar
  }

  useEffect(() => {
    if (triggerScroll && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTriggerScroll(false) // reset
    }
  }, [triggerScroll])

  return (
    <div className="items-center flex flex-col w-full mb-0 gap-0">
      <label htmlFor="question" className="sr-only">
        Pergunta
      </label>
      <input
        ref={inputRef}
        id="question"
        type="text"
        placeholder="Escreve a tua pergunta..."
        maxLength={maxLength}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full lg:max-w-3xl border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="w-full lg:max-w-3xl text-right text-sm text-gray-500 mt-0.5 pr-1.5">
        {question.length} / {maxLength}
      </div>
      <div className="flex justify-center mt-0 relative bottom-2">
        <Button
          text="Leitura"
          type="button"
          disabled={isGenerating}
          onClick={handleClick}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
