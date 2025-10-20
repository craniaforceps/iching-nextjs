export default function DashboardPage() {
  return (
    <main className="main-dashboard">
      <h2 className="h2-title">Bem-vindo ao dashboard</h2>
      <p className="p-primary">
        Nesta versão inicial, poderá explorar as funcionalidades básicas do I
        Ching que temos preparadas para ti.
      </p>
      <ul className="list-text">
        <li>
          <strong>Leituras:</strong> Faz uma questão ao oráculo e clica no botão
          para receberes um hexagrama original e o hexagrama mutante, tal como o
          texto associado ao Julgamento, Imagem e Linhas dos mesmos. Esta
          leitura baseia-se no método tradicional das moedas. Também poderás
          escrever nas notas algumas reflexões pessoais sobre a leitura, e por
          fim guardar tudo num registo que poderás consultar mais tarde.
        </li>
        <li>
          <strong>Arquivo:</strong> Neste separador encontrarás todas as
          leituras que guardaste. Podes rever e alterar os detalhes de cada
          leitura, incluindo as notas que adicionaste. Também terás a opção de
          eliminar leituras que já não desejas manter.
        </li>
        <li>
          <strong>Definições:</strong> Ajuste as suas preferências pessoais para
          uma experiência mais personalizada.
        </li>
      </ul>
      <p className="p-primary">
        Estamos constantemente a trabalhar para melhorar a sua experiência.
        Fique atento às futuras actualizações que trarão ainda mais
        funcionalidades e melhorias!
      </p>
    </main>
  )
}
