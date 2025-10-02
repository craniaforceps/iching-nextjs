'use client'

import { useState } from 'react'

export function useHexagramDisplayState() {
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)

  return { question, setQuestion, notes, setNotes, error, setError }
}
