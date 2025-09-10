'use client'

import { useState, useEffect } from 'react'
// import dynamic from 'next/dynamic'
import Button from '@/components/ui/button/Button'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import HexagramDisplay from './HexagramDisplay'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'

// const TextEditor = dynamic(() => import('@/components/ui/editor/TextEditor'), {
//   ssr: false,
// })

export default function ReadingDisplay() {
  const {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    error,
    handleGenerate,
    handleSave,
  } = useHexagramDisplay()

  const [userMode, setUserMode] = useState<
    'stacked' | 'horizontal' | 'vertical'
  >('horizontal')
  const [mounted, setMounted] = useState(false)
  const [hasAttempted, setHasAttempted] = useState(false)

  // Mounted para SSR
  useEffect(() => setMounted(true), [])

  // Handler leitura com confirmação se já houve tentativa
  const onGenerate = async () => {
    if (hasAttempted && hexagrams) {
      // Modal para sobrescrever leitura
      const { default: Swal } = await import('sweetalert2')
      const res = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Uma nova leitura irá sobrescrever a atual.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, gerar nova',
        cancelButtonText: 'Cancelar',
      })
      if (!res.isConfirmed) return
    }
    setHasAttempted(true)
    handleGenerate()
  }

  if (!mounted) return <LoadingSpinner />

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4">
      {/* Input da pergunta */}
      <div className="items-center flex flex-col">
        <label htmlFor="question" className="sr-only">
          Pergunta
        </label>
        <input
          id="question"
          type="text"
          placeholder="Escreve a tua pergunta..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full lg:max-w-3xl border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-center mt-2">
          <Button text="Leitura" type="button" onClick={onGenerate} />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Botões de modo (apenas depois de gerar leitura) - md+ */}
      {hexagrams && (
        <div className="hidden md:flex flex-wrap gap-4 justify-center mt-4">
          {['stacked', 'horizontal', 'vertical'].map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded transition-colors ${
                userMode === m
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setUserMode(m as typeof userMode)}
            >
              {m === 'stacked'
                ? 'Empilhado'
                : m === 'horizontal'
                  ? 'Horizontal'
                  : 'Vertical'}
            </button>
          ))}
        </div>
      )}

      {/* HexagramDisplay */}
      {hexagrams && (
        <HexagramDisplay
          hexagrams={hexagrams}
          notes={notes}
          setNotes={setNotes}
          onSave={handleSave} // handleSave já inclui modal e reload
          layout={userMode}
        />
      )}
    </div>
  )
}
