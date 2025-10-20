'use client'

import { useEffect, useState } from 'react'

const colors = [
  '#f59e0b',
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#8b5cf6',
  '#f97316',
]
const updateInterval = 1000 // 2 segundos

export const hexagramsSymbolsList = [
  ['䷀', '䷁', '䷂', '䷃', '䷄', '䷅', '䷆', '䷇'],
  ['䷈', '䷉', '䷊', '䷋', '䷌', '䷍', '䷎', '䷏'],
  ['䷐', '䷑', '䷒', '䷓', '䷔', '䷕', '䷖', '䷗'],
  ['䷘', '䷙', '䷚', '䷛', '䷜', '䷝', '䷞', '䷟'],
  ['䷠', '䷡', '䷢', '䷣', '䷤', '䷥', '䷦', '䷧'],
  ['䷨', '䷩', '䷪', '䷫', '䷬', '䷭', '䷮', '䷯'],
  ['䷰', '䷱', '䷲', '䷳', '䷴', '䷵', '䷶', '䷷'],
  ['䷸', '䷹', '䷺', '䷻', '䷼', '䷽', '䷾', '䷿'],
]

function getRandomHexagram() {
  const row = Math.floor(Math.random() * hexagramsSymbolsList.length)
  const col = Math.floor(Math.random() * hexagramsSymbolsList[0].length)
  return hexagramsSymbolsList[row][col]
}

function getRandomColor() {
  const idx = Math.floor(Math.random() * colors.length)
  return colors[idx]
}

export default function AnimatedHexagrams() {
  const [hexagrams, setHexagrams] = useState<string[][]>([])
  const [visibleMatrix, setVisibleMatrix] = useState<boolean[][]>([])
  const [color, setColor] = useState<string>(colors[0])

  const generateMatrix = () => {
    const newHex: string[][] = []
    const newVisible: boolean[][] = []

    for (let i = 0; i < 6; i++) {
      const rowHex: string[] = []
      const rowVisible: boolean[] = []

      for (let j = 0; j < 6; j++) {
        rowHex.push(getRandomHexagram())

        // O sempre visível
        if (j === 0 || j === 1 || j === 4 || j === 5) {
          rowVisible.push(true)
        } else {
          // X centrais
          rowVisible.push(true) // temporário, vamos definir abaixo
        }
      }

      // Pares centrais (índices 2-3)
      const centralVisible = Math.random() > 0.5
      rowVisible[2] = centralVisible
      rowVisible[3] = centralVisible

      newHex.push(rowHex)
      newVisible.push(rowVisible)
    }

    setHexagrams(newHex)
    setVisibleMatrix(newVisible)
    setColor(getRandomColor())
  }

  useEffect(() => {
    generateMatrix()
    const interval = setInterval(generateMatrix, updateInterval)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex flex-col gap-0.5 items-center justify-center mt-2">
      {hexagrams.map((row, i) => (
        <div key={i} className="flex gap-0.5">
          {row.map((hex, j) => (
            <span
              key={j}
              style={{
                color: visibleMatrix[i]?.[j] ? color : 'transparent',
                fontSize: '2rem',
                lineHeight: 1,
              }}
            >
              {hex}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
