'use client'
import React from 'react'
import HexagramTable from './HexagramTable'
import ResponsiveHexagramLayout from '@/components/features/tables/ResponsiveHexagramLayout'
import {
  hexagramsNumbersReference,
  hexagramsSymbolsReference,
  hexagramsEnglishReference,
  trigramsSymbolsReference,
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

  const table = (
    <HexagramTable
      hexagramNumbers={hexagramsNumbersReference}
      hexagramSymbols={hexagramsSymbolsReference}
      hexagramNames={hexagramsEnglishReference}
      selectedHexagram={selectedHexagram}
      hoveredHexagram={hoveredHexagram}
      onClick={(num) => handleHexagramClick(num, setSelectedHexagram)}
      onHover={(num) => handleHexagramHover(num, setHoveredHexagram)}
      onHoverLeave={() => clearHexagramHover(setHoveredHexagram)}
    />
  )

  return (
    <ResponsiveHexagramLayout
      table={table}
      selectedHexagram={selectedHexagram}
      trigrams={trigramsSymbolsReference}
    />
  )
}

export default HexagramReferenceTable
