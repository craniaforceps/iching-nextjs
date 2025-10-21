'use client'

import { useState, useEffect } from 'react'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import ReadingInput from './ReadingInput'
import ModeSelector from '@/components/reading/ModeSelector'
import HexagramDisplay from '../hexagram/HexagramDisplay'

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

  useEffect(() => setMounted(true), [])

  const onGenerate = async () => {
    if (hasAttempted && hexagrams) {
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

  if (!mounted) return null // ou LoadingSpinner se quiseres

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4 min-h-screen">
      <ReadingInput
        question={question}
        setQuestion={setQuestion}
        onGenerate={onGenerate}
        error={error ?? undefined}
      />

      {hexagrams && (
        <ModeSelector userMode={userMode} setUserMode={setUserMode} />
      )}

      {hexagrams && (
        <HexagramDisplay
          hexagrams={hexagrams}
          notes={notes}
          setNotes={setNotes}
          onSave={handleSave}
          layout={userMode}
        />
      )}
    </div>
  )
}
