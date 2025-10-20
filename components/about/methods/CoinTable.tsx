export default function CoinTable() {
  return (
    <div className="table-wrapper">
      <p className="table-caption">
        As probabilidades dos métodos das moedas levam, previsivelmente, a
        probabilidades uniformes para cada linha.
      </p>
      <table className="table-base">
        <caption className="sr-only">
          Probabilidades das linhas para o método das moedas.
        </caption>

        <thead>
          <tr className="">
            <th className=" text-center px-3 py-2 font-medium">Número</th>
            <th className="border-x text-center px-3 py-2 font-medium">
              Probabilidade
            </th>
            <th className=" text-center px-3 py-2 font-medium">Significado</th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="">
            <td className="border text-center px-4 py-3 font-medium">6</td>
            <td className="border text-center px-4 py-3">1/4</td>
            <td className="border text-center px-4 py-3 font-mono">━━x━━</td>
          </tr>
          <tr className="">
            <td className="border text-center px-4 py-3 font-medium">8</td>
            <td className="border text-center px-4 py-3">1/4</td>
            <td className="border text-center px-4 py-3">━━  ━━</td>
          </tr>
          <tr className="">
            <td className="border text-center px-4 py-3 font-medium">9</td>
            <td className="border text-center px-4 py-3">1/4</td>
            <td className="border text-center px-4 py-3 font-mono">━━o━━</td>
          </tr>
          <tr className="">
            <td className="border text-center px-4 py-3 font-medium">7</td>
            <td className="border text-center px-4 py-3">1/4</td>
            <td className="border text-center px-4 py-3">━━━━━</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
