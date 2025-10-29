import Image from 'next/image'

export default function Contexto() {
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

      {/* Segunda seção */}
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">Origem e história</h3>
          <p className="p-primary">
            Na literatura chinesa, quatro homens sagrados são citados como
            autores do I Ching, nomeadamente, Fú Xī, Rei Wén, o Duque de Zhou e
            Confúcio. Fú Xī é uma figura lendária que representa a era da caça e
            pesca e a invenção da culinária. O facto dele ser visto como o
            inventor dos símbolos lineares do Livro das Mutações demonstra a
            ancestralidade do I Ching. Além disso, os oito trigamas têm nomes
            que não ocorrem em nenhuma outra conexão com a língua chinesa, e por
            isso é sugerido que tenham uma origem diferente. Os oito trigramas
            são encontrados em várias combinações em datas precoces, tanto na
            dinastia Xia (206 a.C. – 220 d.C.) chamados de Lián Shān, ou
            "Montanhas Ligadas", como na dinastia Shang (1600–1050 a.C.)
            intitulados de Guǐ Cāng, ou "Retorno ao Tesouro" vários hexagramas
            são mencionados. Ainda que não se saiba ao certo se teriam os mesmos
            nomes e interpretações que têm hoje.
          </p>
        </div>
        <div className="content-side">
          <Image
            src="/images/fuxi-nuwa.jpg"
            width={250}
            height={360}
            quality={75}
            alt="Os irmãos Nüwa (à esquerda) e Fú Xī (à direita). Fú Xī (伏羲) é visto como o primeiro imperador mítico da China, e com a irmã é creditado por ter criado a humanidade, entre outras coisas. É a Fú Xī que é associada a observação dos padrões do universo e criados os oito trigramas."
            className="rounded-full  w-[225px] h-auto m-2"
            loading="lazy" // lazy-loading abaixo da dobra
          />
          <p className="p-caption">
            Os irmãos Nüwa (à esquerda) e Fú Xī (à direita). Fú Xī é visto como
            o primeiro imperador mítico da China, e com a irmã é creditado por
            ter criado a humanidade, entre outras coisas. É a Fú Xī que é
            associada a observação dos padrões do universo e criados os oito
            trigramas.
          </p>
        </div>
      </div>

      {/* Terceira seção */}
      <div className="content-split">
        <div className="content-main">
          <p className="p-primary">
            De acordo com a tradição, a colecção presente de sessenta e quatro
            hexagramas foi originada pelo Rei Wén, pai da dinastia Zhou (1046 -
            256 a.C.). É referido que este acrescentou breves julgamentos aos
            hexagramas durante a sua prisão pelo tirano rei Zhou de Shang. O
            texto relativo às linhas individuais originou-se no seu filho, Duque
            de Zhou. Esta forma do livro, foi intitulada de Mudanças de Zhou
            (Zhou I), e foi usada como oráculo durante o período Zhou, e pode
            ser provada através de uma série de registos históricos. Foi nesta
            altura que Confúncio estudou o livro, sendo altamente provável que o
            "Comentário sobre a Decisão", ou Tuán Zhuàn seja trabalho do
            próprio. O "Comentário sobre as Imagens", ou Xiàng Zhuàn também tem
            início nele, ainda que de uma forma mais indirecta. Um terceiro
            tratado, com um comentário bastante detalhado e valioso sobre as
            linhas individuais, foi compilado pelos seus pupilos e sucessores,
            na forma de questões e perguntas, e sobrevive apenas em fragmentos.
          </p>
        </div>
        <div className="content-side">
          <Image
            src="/images/king-wen.jpg"
            width={250}
            height={430}
            quality={75}
            alt="O Rei Wên (周文王) (1112 a.C. – 1046 a.C.) é o pai da dinastia Zhou. Para além de ser visto como um dos responsáveis por criar os hexagramas através da combinação dos trigramas do Bāguà."
            className="rounded-2xl w-[225px] h-auto m-2"
            loading="lazy"
          />
          <p className="p-caption">
            O Rei Wén (1112 a.C. – 1046 a.C.) é o pai da dinastia Zhou. Para
            além de ser visto como um dos responsáveis por criar os hexagramas
            através da combinação dos trigramas do Bāguà.
          </p>
        </div>
      </div>

      {/* Quarta seção */}
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">Desenvolvimentos posteriores</h3>
          <p className="p-primary">
            Após Confúcio, a difusão do I Ching foi promovida principalmente por
            Pú Shàng. Com o desenvolvimento da filosofia chinesa, o livro passou
            a ser interpretado à luz de conceitos éticos e políticos, como é
            reflectido em obras como "A Grande Instrução" (Dà Xué) e "A Doutrina
            do Meio" (Zhōng Yōng). Durante as dinastias Qin (221-206 a.C.) e Han
            (206 a.C. – 220 a.C.), o I Ching foi explorado por praticantes de
            magia e pelo ensino da doutrina yin-yang, distanciando-o do seu
            sentido original. A filosofia de Wang Pi, no século III,
            reinterpretou o livro como fonte de sabedoria e filosofia de vida, e
            nos períodos posteriores, como o Sòng (960–1279 d.C), tornou-se um
            texto central de estado e ética. Zhū Xī, posteriormente, tentou
            restaurar o I Ching como livro de oráculos, mantendo também
            comentários detalhados sobre a arte da adivinhação.
          </p>
        </div>
        <div className="content-side">
          <Image
            src="/images/tortoise-shell.jpg"
            width={250}
            height={412}
            quality={75}
            alt="Inscrição antiga em carapaça de tartaruga usada em práticas divinatórias e também associada à origem do Bāguà"
            className="rounded-full  w-[225px] h-auto m-2"
            loading="lazy"
          />

          <p className="p-caption">
            Inscrição antiga em carapaça de tartaruga usada em práticas
            divinatórias e também associada à origem do Bāguà.
          </p>
        </div>
      </div>
    </section>
  )
}
