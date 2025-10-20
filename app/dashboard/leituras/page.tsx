import ReadingDisplay from '@/components/features/reading/ReadingDisplay'

export default function LeituraPage() {
  return (
    <main className="main-dashboard">
      <p className="p-primary">
        Aqui poderás fazer uma nova leitura do I Ching. Para tal, sugerimos que
        faças o seguinte:
      </p>
      <ol className="list-text">
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
      <p className="p-primary">
        Se precisares de ajuda ou orientação, não hesites em contactar-nos
        através do Formulário de Contacto presente no separador Definições.
      </p>

      <div className="w-full py-4">
        <ReadingDisplay />
      </div>
    </main>
  )
}
