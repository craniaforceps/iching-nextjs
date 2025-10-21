'use client'

import { useState, useMemo } from 'react'
import { Plus, Minus } from 'lucide-react'

type HexagramLinesProps = {
  lines: string[][]
}

export default function HexagramLines({ lines }: HexagramLinesProps) {
  const [linesOpen, setLinesOpen] = useState(false)
  const [openLines, setOpenLines] = useState<number[]>([])
  const allLines = useMemo(() => lines.map((_, idx) => idx), [lines])

  const toggleLinesHeader = () => {
    setLinesOpen((prev) => !prev)
    if (!linesOpen) setOpenLines(allLines)
  }

  const toggleLine = (idx: number) => {
    setOpenLines((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div>
      <div className="mb-1 flex justify-between items-center cursor-pointer p-1 px-2 rounded text-sm">
        <h3 className="font-semibold tracking-wide leading-loose">Lines</h3>
        <button
          onClick={toggleLinesHeader}
          className="transition-all hover:text-amber-500"
        >
          {linesOpen ? <Minus /> : <Plus />}
        </button>
      </div>

      {linesOpen && (
        <div className="text-sm p-1 px-2">
          {lines.map((lineArr, idx) => {
            const isOpen = openLines.includes(idx)
            return (
              <div key={`line-${idx}`} className="mb-2">
                <div
                  className="flex justify-between items-center mb-1 cursor-pointer group"
                  onClick={() => toggleLine(idx)}
                >
                  <h4 className="font-semibold tracking-wide leading-loose">
                    Line {idx + 1}
                  </h4>
                  <span className="hidden group-hover:inline-flex">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </div>

                {isOpen && (
                  <div className="py-1 border-t space-y-1 text-left tracking-wide leading">
                    {lineArr.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
