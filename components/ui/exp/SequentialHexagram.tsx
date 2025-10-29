'use client'

import { hexagramsSequence } from '@/data/table/dataTable'
import { useState, useEffect } from 'react'

// Lista completa de hexagramas Unicode (64)

export default function SequentialHexagram() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hexagramsSequence.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hexagram = hexagramsSequence[index]

  return (
    <div className="">
      <span className="font-serif select-none font-bold">{hexagram}</span>
    </div>
  )
}
