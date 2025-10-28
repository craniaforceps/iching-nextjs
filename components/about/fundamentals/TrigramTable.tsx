import {
  trigramsSymbolsReference,
  trigramsChineseReference,
  trigramsPortugueseReference,
  trigramsNamePortugueseReference,
  trigramsAttributePortugueseReference,
  trigramsFamilyPortugueseReference,
} from '@/data/table/dataTable'

export const TrigramTable: React.FC = () => (
  <div className="table-wrapper max-w-fit px-2 ">
    <p className="table-caption w-full caption-top">
      A lista dos 8 trigramas do I Ching, com seus respectivos significados e
      imagens associadas.
    </p>
    <table className="table-base text-xs md:text-sm">
      <thead>
        <tr className="text-center">
          <th className="border  p-2 text-center">Símbolo</th>
          <th className="border  p-2 text-center  hidden  ">
            Nome <br></br>Chinês
          </th>
          <th className="border  p-2 text-center">Nome</th>
          <th className="border  p-2 text-center ">Atributo</th>
          <th className="border  p-2 text-center">Imagem</th>
          <th className="border  p-2 text-center hidden">Família</th>
        </tr>
      </thead>
      <tbody>
        {trigramsSymbolsReference.map((symbol, index) => (
          <tr key={index} className="">
            <td className="border  text-center text-2xl p-2">{symbol}</td>
            <td className="border  p-2 text-center hidden">
              {trigramsChineseReference[index]}
            </td>
            <td className="border  p-2 text-center">
              {trigramsNamePortugueseReference[index]}
            </td>
            <td className="border  p-2 text-center wrap-break-word whitespace-normal">
              {trigramsAttributePortugueseReference[index]}
            </td>

            <td className="border  p-2 text-center">
              {trigramsPortugueseReference[index]}
            </td>
            <td className="border  p-2 text-center hidden">
              {trigramsFamilyPortugueseReference[index]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TrigramTable
