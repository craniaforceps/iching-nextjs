import React from 'react'
import HexagramCell from './HexagramCell'
import { HexagramTableProps } from '@/lib/hexagram/hexagramTypes'

// A tabela que mostra os hexagramas com seleção e hover
const HexagramTable: React.FC<HexagramTableProps> = ({
  hexagramNumbers,
  hexagramSymbols,
  hexagramNames,
  selectedHexagram,
  hoveredHexagram,
  onClick,
  onHover,
  onHoverLeave,
}) => (
  <table className="border-collapse border border-gray-400 w-full table-auto">
    <tbody>
      {hexagramNumbers.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((number, cellIndex) => {
            const partialHexagram = {
              number,
              name: hexagramNames[rowIndex][cellIndex],
              unicode: hexagramSymbols[rowIndex][cellIndex],
            }

            return (
              <HexagramCell
                key={cellIndex}
                number={number}
                symbol={partialHexagram.unicode}
                englishName={partialHexagram.name}
                isSelected={selectedHexagram?.number === number}
                isHovered={hoveredHexagram?.number === number}
                onClick={() => onClick(partialHexagram)}
                onMouseEnter={() => onHover(partialHexagram)}
                onMouseLeave={onHoverLeave}
              />
            )
          })}
        </tr>
      ))}
    </tbody>
  </table>
)

export default HexagramTable
