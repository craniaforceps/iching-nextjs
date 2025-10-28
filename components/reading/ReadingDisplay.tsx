'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import ReadingInput from './ReadingInput'
import ModeSelector from '@/components/reading/ModeSelector'
import HexagramDisplay from '../hexagram/HexagramDisplay'
import ReadingLogs from './ReadingLogs'

type ReadingDisplayProps = {
  isGuest?: boolean
}

export default function ReadingDisplay({
  isGuest = false,
}: ReadingDisplayProps) {
  const router = useRouter()
  const {
    question,
    setQuestion,
    notes,
    setNotes,
    lines,
    hexagrams,
    error,
    handleGenerate,
    handleSave,
  } = useHexagramDisplay()

  const [userMode, setUserMode] = useState<
    'stacked' | 'horizontal' | 'vertical'
  >('horizontal')
  const [mounted, setMounted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => setMounted(true), [])

  const onGenerate = async () => {
    // ⚠️ só mostra o modal se já existir uma leitura
    if (hexagrams && question.trim() !== '') {
      const confirm = await Swal.fire({
        title: 'Tens a certeza?',
        text: 'Isto vai substituir a leitura atual.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, continuar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4b5563', // cinzento
        cancelButtonColor: '#dc2626', // vermelho
      })

      if (!confirm.isConfirmed) return // se cancelar, sai
    }

    setIsGenerating(true)
    try {
      await handleGenerate()
    } finally {
      setIsGenerating(false)
    }
  }

  // Guest: salva leitura no localStorage
  const onGuestSave = () => {
    const readingData = { question, notes, lines, hexagrams }
    localStorage.setItem('guestReading', JSON.stringify(readingData))
  }

  if (!mounted) return null

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4 ">
      <ReadingInput
        isGenerating={isGenerating}
        question={question}
        setQuestion={setQuestion}
        onGenerate={onGenerate}
        error={error ?? undefined}
      />

      {hexagrams && (
        <div className="w-2/3 text-center mx-auto items-center">
          <ReadingLogs lines={lines ?? []} />
        </div>
      )}

      {hexagrams && (
        <ModeSelector userMode={userMode} setUserMode={setUserMode} />
      )}

      {hexagrams && (
        <HexagramDisplay
          hexagrams={hexagrams}
          notes={notes}
          setNotes={setNotes}
          onSave={isGuest ? onGuestSave : handleSave}
          layout={userMode}
        />
      )}
    </div>
  )
}
