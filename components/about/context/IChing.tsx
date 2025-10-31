import Image from 'next/image'

export default function IChing() {
  return (
    <section className="main-section">
      {/* Primeira seção (acima da dobra) */}
      <div className="content-split">
        <div className="content-main">
          <h2 className="h2-title">
            O contexto e história resumida do I Ching
          </h2>
          <h3 className="h3-title">Influência na cultura chinesa</h3>
          <p className="p-primary">
            O Livro das Mutações, ou I Ching, é inquestionavelmente um dos
            livros mais importantes na literatura mundial. A sua origem está
            associada a mitologia que remonta à antiguidade, e ocupou a atenção
            dos maiores pensadores chineses até aos dias de hoje. Quase todos os
            grandes nomes que existem nos três mil anos de história cultural
            chinesa retiraram inspiração deste livro, e por vezes exerceram
            influência sobre a interpretação do seu texto. Deste modo, podemos
            dizer que o amadurecer desta sabedoria ao longo de milhares de anos
            foi usado para fazer o I Ching. Por isso, não surpreende que os dois
            principais ramos da filosofia chinesa, Confucionismo e Taoismo,
            tenham raízes comuns aqui.
          </p>
        </div>
        <div className="content-side">
          <Image
            src="/images/orange_bagua.png"
            width={225}
            height={225}
            quality={75}
            alt="De acordo com a tradição, o I Ching remonta a cerca de 5000 anos atrás (2800–2737 a.C.), quando o lendário imperador Fú Xī (伏羲) teria descoberto os oito trigramas, Bāguà (八卦) ao observar padrões na natureza"
            priority
            className="rounded-full  w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            De acordo com a tradição, o I Ching remonta a cerca de 5000 anos
            atrás (2800–2737 a.C.), quando o lendário imperador Fú Xī teria
            descoberto os oito trigramas, Bāguà, ao observar padrões na natureza
          </p>
        </div>
      </div>
    </section>
  )
}
