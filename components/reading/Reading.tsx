import ReadingDisplay from '@/components/reading/ReadingDisplay'

export default function Reading() {
  return (
    <section className="space-y-5">
      <h2 className="h2-title">Leituras</h2>

      <h2 className="h3-title">Instruções:</h2>
      <div className="">
        <ol className="list-text list-decimal space-y-2 text-left">
          <li>Formula uma pergunta clara e específica.</li>
          <li>
            Clica no botão para gerar um hexagrama original e o seu mutante.
          </li>
          <li>
            Explora os textos associados ao Julgamento, Imagem e Linhas dos
            hexagramas.
          </li>
          <li>Escreve a tua interpretação e reflexão acerca da leitura</li>
          <li>Guarda a leitura para consulta futura.</li>
        </ol>
      </div>

      <p className="p-primary">
        Se precisares de ajuda ou orientação, não hesites em contactar-nos
        através do Formulário de Contacto presente no separador Definições.
      </p>

      <div className="mt-10">
        <ReadingDisplay />
      </div>
    </section>
  )
}
