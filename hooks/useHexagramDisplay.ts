'use client'

import { useHexagramGenerator } from './useHexagramGenerator'
import { useHexagramSaver } from './useHexagramSaver'
import { useHexagramDisplayState } from './useHexagramDisplayState'

export function useHexagramDisplay() {
  const { question, setQuestion, notes, setNotes, error, setError } =
    useHexagramDisplayState()

  const { hexagrams, setHexagrams, buttonRef, handleGenerate } =
    useHexagramGenerator()

  const { handleSave } = useHexagramSaver({
    hexagrams,
    question,
    notes,
  })

  return {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    setHexagrams,
    error,
    setError,
    buttonRef,
    handleGenerate: () => handleGenerate(question),
    handleSave,
  }
}
