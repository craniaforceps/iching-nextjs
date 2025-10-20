'use client'
type CoinLineRowProps = {
  line: { tosses: number[]; sum: number; symbol: string }
  index: number
  total: number
}

export default function CoinLineRow({ line, index, total }: CoinLineRowProps) {
  return (
    <tr>
      <td className="border border-gray-400 p-1 text-center">
        {total - index}
      </td>
      <td className="border border-gray-400 p-1 font-mono text-center">
        {line.tosses.join(' + ')}
      </td>
      <td className="border border-gray-400 p-1 text-center">{line.sum}</td>
      <td className="border border-gray-400 p-1 font-mono whitespace-pre text-center">
        {line.symbol}
      </td>
    </tr>
  )
}
