'use client'

import { HexagramDetailsProps } from '@/lib/hexagram/hexagramTypes'
import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

// O componente que mostra os detalhes (Judgment, Image, Lines) de um hexagrama
function HexagramDetails({ title, content, hexagramId }: HexagramDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Verifica se é um array
  const isGrouped = Array.isArray(content[0])

  useEffect(() => {
    setIsOpen(false)
  }, [hexagramId])

  return (
    <div className="text-sm p-1 px-2 ">
      <div className="flex justify-between items-center mb-1 ">
        <h4 className="font-semibold tracking-wide leading-loose">{title}</h4>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" hover:text-amber-500"
        >
          {isOpen ? <Minus /> : <Plus />}
        </button>
      </div>

      {isOpen && (
        <div className="py-1 border-t space-y-1 text-justify tracking-wide leading ">
          {isGrouped
            ? (content as string[][]).map((block, i) => (
                <div
                  className="py-1 pb-3 border-b space-y-1 text-left tracking-wide leading"
                  key={i}
                >
                  {block.map((line, j) => (
                    <p className="text-7xl" key={j}>
                      {line}
                    </p>
                  ))}
                </div>
              ))
            : (content as string[]).map((line, i) => <p key={i}>{line}</p>)}
        </div>
      )}
    </div>
  )
}
export default HexagramDetails
