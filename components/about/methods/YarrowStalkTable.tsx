export default function YarrowStalkTable() {
  return (
    <div className="table-wrapper">
      <p className="table-caption ">
        As probabilidades do método do milefólio são bastante variáveis,
        principalmente no que diz respeito às linhas fixas que são bem mais
        prováveis.
      </p>
      <table className="table-base">
        <caption className="sr-only">
          Tabela de probabilidades e significados dos traços do I Ching para o
          método dos talos de milefólio
        </caption>

        <thead>
          <tr className="border">
            <th className="border text-center px-4 py-2  font-medium ">
              Número
            </th>
            <th className="border text-center px-4 py-2  font-medium ">
              Probabilidade
            </th>

            <th className="border text-center px-4 py-2  font-medium ">
              Significado
            </th>
          </tr>
        </thead>

        <tbody className="border">
          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">6</td>
            <td className="border text-center  px-4 py-3  ">1/16</td>

            <td className="border text-center px-4 py-3  font-mono ">━━x━━</td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">8</td>
            <td className="border text-center px-4 py-3  ">7/16</td>

            <td className="border text-center px-4 py-3  ">━━  ━━</td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3  font-medium">9</td>
            <td className="border text-center px-4 py-3  ">3/16</td>

            <td className="border text-center px-4 py-3  font-mono ">━━o━━</td>
          </tr>

          <tr className="border">
            <td className="border text-center px-4 py-3   font-medium">7</td>
            <td className="border text-center px-4 py-3  ">5/16</td>

            <td className="border text-center px-4 py-3  "> ━━━━━</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
