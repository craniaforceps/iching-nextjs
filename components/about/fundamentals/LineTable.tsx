export default function LineTable() {
  return (
    <div className="table-wrapper max-w-fit">
      <caption className="table-caption">
        Os oito trigramas e os valores e tipos de linhas. Yin para linhas
        quebradas e Yang para linhas inteiras.
      </caption>
      <table className="table-base lg:text-sm">
        <thead>
          <tr className="border">
            <th className="border text-center px-4 py-2  font-medium ">
              Número
            </th>
            <th className="border text-center px-4 py-2  font-medium ">Tipo</th>

            <th className="border text-center px-4 py-2  font-medium ">
              Visual
            </th>
          </tr>
        </thead>

        <tbody className="border">
          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">6</td>
            <td className="border text-center  px-4 py-3  ">Yin mutante</td>

            <td className="border text-center px-4 py-3  font-mono ">━━x━━</td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">7</td>
            <td className="border text-center px-4 py-3  ">Yang fixa</td>

            <td className="border text-center px-4 py-3  ">━━━━━ </td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">8</td>
            <td className="border text-center px-4 py-3  ">Yin fixa</td>

            <td className="border text-center px-4 py-3  font-mono ">━━ ━━</td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3   font-medium">9</td>
            <td className="border text-center px-4 py-3  ">Yang mutante</td>

            <td className="border text-center px-4 py-3 "> ━━o━━</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
