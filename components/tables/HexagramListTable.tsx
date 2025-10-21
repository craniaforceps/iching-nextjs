import React from 'react'
import HexagramTable from './HexagramTable'
import ResponsiveHexagramLayout from '@/components/tables/ResponsiveHexagramLayout'
import {
  hexagramsNumbersList,
  hexagramsSymbolsList,
  hexagramsEnglishList,
} from '@/data/table/dataTable'
import useHexagramSelection from '@/hooks/useHexagramSelection'
import {
  handleHexagramClick,
  handleHexagramHover,
  clearHexagramHover,
} from '@/lib/table/tableHandlers'

// O componente que mostra a tabela de hexagramas sequenciais com seleção e hover
const HexagramListTable: React.FC = () => {
  const {
    selectedHexagram,
    hoveredHexagram,
    setSelectedHexagram,
    setHoveredHexagram,
  } = useHexagramSelection()

  const table = (
    <HexagramTable
      hexagramNumbers={hexagramsNumbersList}
      hexagramSymbols={hexagramsSymbolsList}
      hexagramNames={hexagramsEnglishList}
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
    />
  )
}

export default HexagramListTable
