'use client'
import React from 'react'
import HexagramCell from './HexagramCell'
import {
  hexagramsNumbersList,
  hexagramsSymbolsList,
  hexagramsEnglishList,
} from '@/data/table/dataTable'
import {
  handleHexagramClick,
  handleHexagramHover,
  clearHexagramHover,
} from '@/lib/table/tableHandlers'
import useHexagramSelection from '@/hooks/useHexagramSelection'
import ResponsiveHexagramLayout from '@/components/features/display/ResponsiveHexagramLayout'
import type { HexagramObject } from '@/lib/types/hexagramTypes'

const HexagramListTable: React.FC = () => {
  const {
    selectedHexagram,
    hoveredHexagram,
    setSelectedHexagram,
    setHoveredHexagram,
  }: {
    selectedHexagram: HexagramObject | null
    hoveredHexagram: HexagramObject | null
    setSelectedHexagram: (hexagram: HexagramObject | null) => void
    setHoveredHexagram: (hexagram: HexagramObject | null) => void
  } = useHexagramSelection()

  const table = (
    <table className="border-collapse border border-gray-400 w-full table-auto">
      <tbody>
        {hexagramsNumbersList.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((number, cellIndex) => {
              const partialHexagram = {
                number,
                name: hexagramsEnglishList[rowIndex][cellIndex],
                unicode: hexagramsSymbolsList[rowIndex][cellIndex],
              }

              return (
                <HexagramCell
                  key={cellIndex}
                  number={number}
                  symbol={partialHexagram.unicode}
                  englishName={partialHexagram.name}
                  isSelected={selectedHexagram?.number === number}
                  isHovered={hoveredHexagram?.number === number}
                  onClick={async () =>
                    await handleHexagramClick(
                      partialHexagram,
                      setSelectedHexagram
                    )
                  }
                  onMouseEnter={() =>
                    handleHexagramHover(partialHexagram, setHoveredHexagram)
                  }
                  onMouseLeave={() => clearHexagramHover(setHoveredHexagram)}
                />
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <ResponsiveHexagramLayout
      table={table}
      selectedHexagram={selectedHexagram}
    />
  )
}

export default HexagramListTable
