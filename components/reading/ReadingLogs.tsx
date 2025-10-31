'use client'

import { useState } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import type { Line } from '@/lib/hexagram/hexagramTypes'

type ReadingLogsProps = {
  lines?: Line[]
  hexagramRaw?: string
  title?: string
}

export default function ReadingLogs({
  lines,
  hexagramRaw,
  title = 'Logs',
}: ReadingLogsProps) {
  const [open, setOpen] = useState(false)

  const isMovingLine = (sum: number) => sum === 6 || sum === 9

  // 🔹 fallback: gera linhas a partir do hexagramRaw se lines não existir
  const safeLines: Line[] =
    lines?.length === 6
      ? lines
      : (hexagramRaw?.split('').map((v) => ({
          tosses: [], // no arquivo não temos tosses
          sum: Number(v),
          symbol: (() => {
            switch (Number(v)) {
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
          })(),
        })) ?? [])

  const sumsSequence = safeLines.map((l) => l.sum).join('')

  return (
    <AccordionItem title={title} isOpen={open} onToggle={() => setOpen(!open)}>
      <div className="flex lg:flex-row flex-col justify-around items-center w-full space-y-2 lg:space-x-0">
        {/* Sequência de somas */}
        <div className="flex flex-col justify-center items-center font-mono text-center w-fit">
          <p className="text-base">{sumsSequence}</p>
        </div>

        {/* Bloco de linhas tipo console.log */}
        <div className="flex flex-col justify-center items-center gap-2 mt-2 lg:mt-5 font-mono text-xs text-center mb-5 w-fit">
          {[...safeLines].reverse().map((line, idx) => (
            <div
              key={idx}
              className={isMovingLine(line.sum) ? 'text-yellow-600' : ''}
            >
              Linha {safeLines.length - idx}:{' '}
              {line.tosses.length ? line.tosses.join(' + ') + ' = ' : ''}
              {line.sum}
            </div>
          ))}
        </div>

        {/* Símbolos visuais */}
        <div className="flex flex-col justify-center items-center p-2 font-mono w-fit text-center">
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
