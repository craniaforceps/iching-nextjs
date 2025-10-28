import React from 'react'
import HexagramCell from './HexagramCell'
import ResponsiveHexagramLayout from '@/components/tables/ResponsiveHexagramLayout'
import {
  hexagramsNumbersReference,
  hexagramsSymbolsReference,
  hexagramsEnglishReference,
  trigramsSymbolsReference,
  trigramsChineseReference,
  trigramsEnglishReference,
} from '@/data/table/dataTable'
import useHexagramSelection from '@/hooks/useHexagramSelection'
import {
  handleHexagramClick,
  handleHexagramHover,
  clearHexagramHover,
} from '@/lib/table/tableHandlers'

const HexagramReferenceTable: React.FC = () => {
  const {
    selectedHexagram,
    hoveredHexagram,
    setSelectedHexagram,
    setHoveredHexagram,
  } = useHexagramSelection()

  // --- Tabela com cabeçalhos horizontais e verticais ---
  const table = (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-400 table-auto w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-center"></th>
            {trigramsSymbolsReference.map((sym, colIdx) => (
              <th
                key={colIdx}
                className="border border-gray-400 px-2 py-1 text-center"
                title={`${trigramsEnglishReference[colIdx]} (${trigramsChineseReference[colIdx]})`}
              >
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-[4px] lg:text-sm hidden">
                    {trigramsEnglishReference[colIdx]}
                  </span>
                  <span className="lg:text-5xl text-xl">{sym}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {hexagramsNumbersReference.map((rowNums, rowIdx) => (
            <tr key={rowIdx}>
              {/* cabeçalho vertical */}
              <th
                className="border border-gray-400 px-2 py-1 text-center "
                title={`${trigramsEnglishReference[rowIdx]} (${trigramsChineseReference[rowIdx]})`}
              >
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-[4px] hidden">
                    {trigramsEnglishReference[rowIdx]}
                  </span>
                  <span className="lg:text-5xl md:text-xl text-xl">
                    {trigramsSymbolsReference[rowIdx]}
                  </span>
                </div>
              </th>

              {rowNums.map((number, colIdx) => {
                const symbol = hexagramsSymbolsReference[rowIdx][colIdx]
                const name = hexagramsEnglishReference[rowIdx][colIdx]
                const isSelected = selectedHexagram?.number === number
                const isHovered = hoveredHexagram?.number === number

                return (
                  <HexagramCell
                    key={colIdx}
                    number={number}
                    symbol={symbol}
                    englishName={name}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    onClick={() =>
                      handleHexagramClick({ number }, setSelectedHexagram)
                    }
                    onMouseEnter={() =>
                      handleHexagramHover({ number }, setHoveredHexagram)
                    }
                    onMouseLeave={() => clearHexagramHover(setHoveredHexagram)}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // --- Layout com card lateral de seleção ---
  return (
    <ResponsiveHexagramLayout
      table={table}
      selectedHexagram={selectedHexagram}
      trigrams={trigramsSymbolsReference}
    />
  )
}

export default HexagramReferenceTable
