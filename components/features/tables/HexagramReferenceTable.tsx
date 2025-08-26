'use client'

import React, { useState } from 'react'
import HexagramCell from './HexagramCell'
import {
  hexagramsNumbersReference,
  hexagramsSymbolsReference,
  hexagramsEnglishReference,
  trigramsSymbolsReference,
  //   trigramsChineseReference,
  trigramsEnglishReference,
} from '@/data/table/dataTable'
import type { HexagramObject } from '@/lib/types/hexagramTypes'
import HexagramCard from '@/components/features/display/HexagramCard'
import useHexagramSelection from '@/hooks/useHexagramSelection'

type PartialHexagram = {
  number: number
  symbol: string
  englishName: string
}

const HexagramReferenceTable: React.FC = () => {
  const {
    selectedHexagram,
    setSelectedHexagram,
  }: {
    selectedHexagram: HexagramObject | null
    setSelectedHexagram: (hexagram: HexagramObject | null) => void
  } = useHexagramSelection()

  const [hoveredHexagram, setHoveredHexagram] =
    useState<PartialHexagram | null>(null)

  async function fetchHexagram(number: number) {
    try {
      const res = await fetch(`/api/hexagram/${number}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: HexagramObject = await res.json()
      setSelectedHexagram(data)
    } catch (error) {
      console.error(error)
      setSelectedHexagram(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <table className="border-collapse border border-gray-400 w-full table-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2 text-[9px] text-center">
              <div className="flex flex-col items-center">
                <span>Upper →</span>
                <span>Lower ↓</span>
              </div>
            </th>
            {trigramsSymbolsReference.map((symbol, index) => (
              <th
                key={index}
                className="border border-gray-400 p-2 text-center "
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl md:text-5xl leading-none">
                    {symbol}
                  </span>
                  {/* Esconder nomes abaixo de lg */}
                  {/* <span className="text-[7px] sm:text-[8px] hidden lg:inline">
                    {trigramsChineseReference[index]}
                  </span> */}
                  <span className="text-[8px] lg:text-[9px] hidden lg:inline ">
                    {trigramsEnglishReference[index]}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {hexagramsNumbersReference.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-400 p-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl md:text-5xl leading-none">
                    {trigramsSymbolsReference[rowIndex]}
                  </span>
                  {/* Esconder nomes abaixo de lg */}
                  {/* <span className="text-[7px] sm:text-[8px] hidden lg:inline">
                    {trigramsChineseReference[rowIndex]}
                  </span> */}
                  <span className="text-[7px] sm:text-[8px] hidden lg:inline lg:text-[9px]">
                    {trigramsEnglishReference[rowIndex]}
                  </span>
                </div>
              </td>
              {row.map((number, columnIndex) => (
                <HexagramCell
                  key={columnIndex}
                  number={number}
                  symbol={hexagramsSymbolsReference[rowIndex][columnIndex]}
                  englishName={hexagramsEnglishReference[rowIndex][columnIndex]}
                  isSelected={selectedHexagram?.number === number}
                  isHovered={hoveredHexagram?.number === number}
                  onClick={() => fetchHexagram(number)}
                  onMouseEnter={() =>
                    setHoveredHexagram({
                      number,
                      symbol: hexagramsSymbolsReference[rowIndex][columnIndex],
                      englishName:
                        hexagramsEnglishReference[rowIndex][columnIndex],
                    })
                  }
                  onMouseLeave={() => setHoveredHexagram(null)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <HexagramCard title="Hexagrama" hexagram={selectedHexagram} />
    </div>
  )
}

export default HexagramReferenceTable
