'use client'
import CoinLineRow from './CoinLineRow'

type CoinLinesTableProps = {
  lines: { tosses: number[]; sum: number; symbol: string }[]
}

export default function CoinLinesTable({ lines }: CoinLinesTableProps) {
  if (lines.length === 0) return null

  return (
    <table className="table-auto w-auto mx-auto border-collapse border border-gray-400 text-center text-xs lg:text-base">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="border border-gray-400 p-1">Linha</th>
          <th className="border border-gray-400 p-1">Moedas</th>
          <th className="border border-gray-400 p-1">Soma</th>
          <th className="border border-gray-400 p-1">Símbolo</th>
        </tr>
      </thead>
      <tbody>
        {lines
          .slice()
          .reverse()
          .map((line, i) => (
            <CoinLineRow key={i} line={line} index={i} total={lines.length} />
          ))}
      </tbody>
    </table>
  )
}
