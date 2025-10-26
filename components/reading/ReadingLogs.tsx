'use client'

import { useState } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import { Line } from '@/lib/hexagram/hexagramTypes'

type ReadingLogsProps = {
  lines: Line[]
  title?: string
}

export default function ReadingLogs({
  lines,
  title = 'Dados da leitura (debug)',
}: ReadingLogsProps) {
  const [open, setOpen] = useState(false)

  const getBinary = (sum: number) => (sum % 2 === 0 ? 0 : 1)
  const hexBinary = lines.map((l) => getBinary(l.sum)).join('')

  return (
    <AccordionItem title={title} isOpen={open} onToggle={() => setOpen(!open)}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Mini hexagrama vertical */}
        <div className="flex flex-col justify-end font-mono text-center">
          {lines
            .slice()
            .reverse()
            .map((line, idx) => (
              <div
                key={idx}
                className={`my-0.5 ${line.sum === 6 || line.sum === 9 ? 'text-yellow-600' : ''}`}
              >
                {line.symbol}
              </div>
            ))}
        </div>

        {/* Tabela de log */}
        <div className="flex-1">
          <p className="mb-2 font-mono text-sm">
            Binário do hexagrama: {hexBinary}
          </p>
          <table className="border-collapse border w-full text-sm">
            <thead>
              <tr>
                <th className="border p-1">Linha</th>
                <th className="border p-1">Moedas</th>
                <th className="border p-1">Soma</th>
                <th className="border p-1">Símbolo</th>
                <th className="border p-1">Binário</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx}>
                  <td className="border p-1">{idx + 1}</td>
                  <td className="border p-1">{JSON.stringify(line.tosses)}</td>
                  <td className="border p-1">{line.sum}</td>
                  <td className="border p-1">{line.symbol}</td>
                  <td className="border p-1">{getBinary(line.sum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AccordionItem>
  )
}
