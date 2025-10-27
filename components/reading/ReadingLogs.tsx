'use client'

import { useState, useEffect } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import type { Line } from '@/lib/hexagram/hexagramTypes'

type ReadingLogsProps = {
  lines?: Line[] // linhas já calculadas
  title?: string
  binary?: string // fallback antigo
  hexagramRaw?: string // fallback preferencial
}

export default function ReadingLogs({
  lines,
  title = 'Logs',
  binary,
  hexagramRaw,
}: ReadingLogsProps) {
  const [open, setOpen] = useState(false)

  const getSymbol = (sum: number) => {
    switch (sum) {
      case 6:
        return '━━x━━'
      case 7:
        return '━━━━━'
      case 8:
        return '━━ ━━'
      case 9:
        return '━━o━━'
      default:
        return '?'
    }
  }

  const isMovingLine = (sum: number) => sum === 6 || sum === 9

  // 🔹 fallback: recria linhas básicas se não existirem
  const safeLines: Line[] =
    lines && lines.length > 0
      ? lines
      : hexagramRaw
        ? hexagramRaw
            .padStart(6, '0')
            .split('')
            .map((bit) => {
              const sum = bit === '1' ? 9 : 6
              const line = {
                tosses: [
                  sum === 9 ? 3 : 2,
                  sum === 9 ? 3 : 2,
                  sum === 9 ? 3 : 2,
                ],
                sum,
                symbol: getSymbol(sum),
              }
              console.log('Generated line from hexagramRaw:', { bit, line })
              return line
            })
        : binary
          ? binary
              .padStart(6, '0')
              .split('')
              .map((bit) => {
                const sum = bit === '1' ? 9 : 6
                const line = {
                  tosses: [
                    sum === 9 ? 3 : 2,
                    sum === 9 ? 3 : 2,
                    sum === 9 ? 3 : 2,
                  ],
                  sum,
                  symbol: getSymbol(sum),
                }
                console.log('Generated line from binary:', { bit, line })
                return line
              })
          : []

  useEffect(() => {
    console.log('ReadingLogs safeLines:', safeLines)
  }, [safeLines])

  const sumsSequence = safeLines.map((l) => l.sum).join('')

  return (
    <AccordionItem title={title} isOpen={open} onToggle={() => setOpen(!open)}>
      <div className="flex lg:flex-row flex-col justify-between items-center w-full border-red-500 space-y-2">
        {/* Sequência de somas */}
        <div className="flex flex-col justify-center items-center font-mono text-center lg:w-1/5">
          <p className="text-base">{sumsSequence}</p>
        </div>

        {/* Bloco de linhas tipo console.log */}
        <div className="flex flex-col justify-center items-center gap-2 mt-2 lg:mt-5 font-mono text-xs text-center lg:w-3/5 mb-5">
          {[...safeLines].reverse().map((line, idx) => (
            <div
              key={idx}
              className={isMovingLine(line.sum) ? 'text-yellow-600' : ''}
            >
              Linha {safeLines.length - idx}: {line.tosses.join(' + ')} ={' '}
              {line.sum}
            </div>
          ))}
        </div>

        {/* Símbolos visuais */}
        <div className="flex flex-col justify-center items-center p-2 font-mono lg:w-1/5 text-center">
          {[...safeLines].reverse().map((line, idx) => (
            <div
              key={idx}
              className={isMovingLine(line.sum) ? 'text-yellow-600' : ''}
            >
              {line.symbol}
            </div>
          ))}
        </div>
      </div>
    </AccordionItem>
  )
}
