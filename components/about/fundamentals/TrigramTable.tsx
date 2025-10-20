import {
  trigramsSymbolsReference,
  trigramsChineseReference,
  trigramsEnglishReference,
} from '@/data/table/dataTable'

export const TrigramTable: React.FC = () => (
  <div className="table-wrapper">
    <p className="table-caption">
      A lista dos 8 trigramas do I Ching, com seus respectivos significados.
    </p>
    <table className="table-base">
      <thead>
        <tr className="text-center">
          <th className="border border-gray-400 p-2 text-center">Símbolo</th>
          <th className="border border-gray-400 p-2 text-center">
            Nome <br></br>(chinês)
          </th>
          <th className="border border-gray-400 p-2 text-center">
            Nome <br></br> (inglês)
          </th>
        </tr>
      </thead>
      <tbody>
        {trigramsSymbolsReference.map((symbol, index) => (
          <tr key={index} className="">
            <td className="border border-gray-400 text-center text-2xl p-2">
              {symbol}
            </td>
            <td className="border border-gray-400 p-2 text-center">
              {trigramsChineseReference[index]}
            </td>
            <td className="border border-gray-400 p-2 text-center">
              {trigramsEnglishReference[index]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TrigramTable
