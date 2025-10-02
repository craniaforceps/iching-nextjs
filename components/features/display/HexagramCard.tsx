'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import HexagramDetails from './HexagramDetails'
import type { HexagramCardProps } from '@/lib/types/hexagramTypes'

// O cartão que mostra os detalhes de um hexagrama (Judgment, Image, Lines)
export default function HexagramCard({ title, hexagram }: HexagramCardProps) {
  if (!hexagram) {
    return (
      <p className="text-center italic text-gray-500">
        {/* Hexagram data not found. */}
      </p>
    )
  }

  const { number, name, unicode, details } = hexagram
  const { image = [], judgment = [], lines = [] } = details ?? {}

  // Controle do bloco Lines aberto/fechado
  const [linesOpen, setLinesOpen] = useState(false)
  // Controle das linhas internas abertas
  const [openLines, setOpenLines] = useState<number[]>([])

  // Abrir/fechar bloco Lines
  const toggleLinesHeader = () => {
    setLinesOpen((prev) => !prev)
    if (!linesOpen) {
      // ao abrir, todas as linhas internas ficam abertas por default
      setOpenLines(lines.map((_, idx) => idx))
    }
  }

  // Toggle linha interna individual
  const toggleLine = (idx: number) => {
    setOpenLines((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className="mb-4 w-full">
      <h2 className="font-semibold md:text-base text-center">{title}</h2>
      <p className="text-center">
        {number}. {name}
      </p>
      <p className="lg:text-9xl md:text-8xl text-8xl pb-5 text-center">
        {unicode}
      </p>

      {/* Judgment e Image */}
      <HexagramDetails
        hexagramId={number}
        title="Judgment"
        content={judgment}
      />
      <HexagramDetails hexagramId={number} title="Image" content={image} />

      {/* Cabeçalho Lines */}
      <div className="mb-1 flex justify-between items-center cursor-pointer p-1 px-2 rounded text-sm">
        <h3 className="font-semibold tracking-wide leading-loose">Lines</h3>
        <button onClick={toggleLinesHeader}>
          {linesOpen ? <Minus /> : <Plus />}
        </button>
      </div>

      {/* Linhas internas */}
      {linesOpen && (
        <div className="text-sm p-1 px-2">
          {lines.map((lineArr, idx) => {
            const isOpen = openLines.includes(idx)
            return (
              <div key={idx} className="mb-2">
                {/* Cabeçalho da linha */}
                <div
                  className="flex justify-between items-center mb-1 cursor-pointer group"
                  onClick={() => toggleLine(idx)}
                >
                  <h4 className="font-semibold tracking-wide leading-loose">{`Line ${idx + 1}`}</h4>
                  <span className="hidden group-hover:inline-flex">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </div>

                {/* Conteúdo da linha */}
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
