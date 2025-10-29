'use client'
import Image from 'next/image'

import TrigramTable from './TrigramTable'
import Link from 'next/link'
import LineTable from './LineTable'

export default function Fundamentals() {
  return (
    <section className="main-section">
      <div className="content-split">
        {/* TEXTO À ESQUERDA */}
        <div className="content-main">
          <h2 className="h2-title">
            Os príncipios base fundamentais para perceber o I Ching
          </h2>
          <h3 className="h3-title">O princípio fundamental do Yin-Yang</h3>
          <p className="p-primary">
            Inicialmente, o Livro das Mutações era uma colecção de sinais
            lineares que eram usados como oráculos. Na antiguidade, oráculos
            eram usados em múltiplas circunstâncias, sendo os mais antigos
            destes reduzidos a respostas como "sim" ou "não". Este tipo de
            oráculo é provavelmente a base do I Ching, onde "sim" (ou yang) era
            indicado por uma linha inteira (———) e o "não" (ou yin) por uma
            linha partida (— —). Todavia, a necessidade de maior diferenciação
            parece ter sido sentida numa idade precoce e estas linhas simples
            foram combinadas em pares. A estas combinações foi adicionada uma
            terceira linha, e assim surgiram os oito trigramas conhecidos.
          </p>
        </div>

        {/* IMAGEM À DIREITA */}
        <div className="content-side">
          <Image
            src="/images/yin-yang-scroll.jpg"
            width={300}
            height={413}
            alt="Pintura num pergaminho com três sábios a estudarem o Yin Yang com
                      três crianças e um veado (Século XVIII)."
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full dark:hover:invert-0  w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            Pintura num pergaminho com três sábios a estudarem o Yin Yang com
            três crianças e um veado (Século XVIII).
          </p>
        </div>
      </div>
      <div className="content-split">
        {/* TEXTO À ESQUERDA */}
        <div className="content-main">
          <p className="p-primary">
            Os trigramas são assim resultado da dualidade manifestada pelo
            próprio Yin-Yang e que por sua vez é transmitida a estes. Todavia, o
            Yin-Yang que também se baseia em parte num outro aspecto fundamental
            do Livro das Mutações que, tal como o nome indica, é a mudança. Essa
            mudança é causada, em parte, pela "idade" ou estado de cada linha
            Yin ou Yang. Este estado é determinado tendo em consideração quatro
            valores (6, 7, 8 e 9) que são conseguidos através dos diferentes{' '}
            <Link href="/metodos">
              <u>métodos</u>
            </Link>
            . Ao consultar o I Ching através de um dos métodos vamos obter uma
            sequência de seis valores entre 6 e 9. Esta sequência pode ser
            traduzida em dois hexagramas (original e mutante) que, caso
            contenham linhas mutantes, serão diferentes um do outro.
          </p>
          <LineTable />
        </div>

        {/* IMAGEM À DIREITA */}
        <div className="content-side">
          <Image
            src="/images/trigrams-tibet.jpg"
            width={250}
            height={188}
            alt='Representação da "Tábua Mística". Contém o escudo da tartaruga
            (aludindo ao animal que revelou os trigramas a Fú Xī e que foi, de
            acordo com relatos canónicos, um cavalo-dragão), um quadro com os 8
            trigramas, os 12 animais do zodíaco chinês.'
            quality={75}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2  dark:hover:invert-0"
          />
          <p className="p-caption">
            Representação da "Tábua Mística". Contém o escudo da tartaruga
            (aludindo ao animal que revelou os trigramas a Fú Xī e que foi, de
            acordo com relatos canónicos, um cavalo-dragão), um quadro com os 8
            trigramas, os 12 animais do zodíaco chinês.
          </p>
        </div>
      </div>
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">A transição e as imagens dos trigramas</h3>
          <p className="p-primary">
            Os trigramas foram concebidos como imagens de tudo aquilo que
            acontece no céu e na terra. Em simultâneo, também parecem possuir um
            estado de transição contínua, em que um se altera para outro, como a
            transição de um fenómeno para o outro está continuamente a tomar
            lugar no mundo físico. Aqui cristaliza-se o princípio da mudança do
            I Ching, ao qual já tinha aludido anteriormente quando discuti o
            Yin-Yang. Os oito trigramas como símbolos que representam estados
            transicionais, são imagens que estão constantemente em mudança.
            Assim a atenção concentra-se não nas coisas no seu "estado de ser",
            mas sim nos seus movimentos em mudança. Resumindo, os trigramas não
            são representações das coisas como tal, mas das suas tendências em
            movimento.
          </p>
          <TrigramTable />{' '}
        </div>
        <div className="content-side lg:justify-evenly items-center justify-center">
          {' '}
          <div className="flex flex-col items-center justify-center">
            {' '}
            <Image
              src="/images/svg/yinyang_bagua.svg"
              width={300}
              height={300}
              alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                (1700-1725)"
              quality={75}
              sizes="(max-width: 768px) 100vw, 40vw"
              className=" w-[225px] h-auto m-2 dark:invert"
            />
            <p className="p-caption">Yin-Yang e trigramas.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {' '}
            <Image
              src="/images/leibniz-diagrams.webp"
              width={250}
              height={240}
              alt="Um diagrama com os hexagramas do I Ching enviado a G. W. Leibniz pelo jesuíta Joachim Bouvet em 1701. O diagrama mostra a relação entre o I Ching e a aritmética binária."
              quality={75}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="rounded-full b dark:hover:invert-0 w-[225px] h-auto m-2"
            />
            <p className="p-caption">
              Um diagrama com os hexagramas do I Ching enviado a G. W. Leibniz
              pelo jesuíta Joachim Bouvet em 1701. O diagrama mostra a relação
              entre o I Ching e a aritmética binária.
            </p>
          </div>
        </div>
      </div>
      <div className="content-split">
        <div className="content-main">
          <p className="p-primary">
            Os oito trigramas têm uma miríade de significados e possíveis
            interpretações. Eles representam os processos da natureza e o seu
            carácter intrísico. Também podem ser interpretados como uma família,
            com pai, mãe, três filhos e três filhas, isto num sentido abstracto,
            não como entidades objectivas mas mais no que diz respeito a uma
            função simbólica. É da relação dos trigramas que se forma o
            significado dos hexagramas, podemos considerar dois trigramas
            particularmente influentes num hexagrama: o superior e o inferior.
            Todavia de um modo menos ortodoxo também podem ser considerados
            outros trigramas presentes de uma forma menos linear, como os
            trigramas nucleares.
          </p>
          <p className="p-primary">
            Muitas são as interpretações possíveis, tanto da relação entre os
            trigramas dentro de cada hexagrama, como na relação dos trigramas
            dos hexagramas originais e mutantes. Assim, enquanto que o Yin-Yang
            constitui a unidade conceptual fundamental dos hexagramas ao criar
            cada linha individual, os trigramas funcionam um pouco mais como
            "unidade interpretativa", cuja relação entre as "imagens" dos
            trigramas, em última instância, fundamenta o significado dos
            hexagramas que formam.
          </p>
        </div>
        <div className="content-side">
          {' '}
          <Image
            src="/images/svg/circle-hexagrams.svg"
            width={300}
            height={300}
            alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                (1700-1725)"
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className=" w-[225px] h-auto m-2 dark:invert"
          />
          <p className="p-caption">
            Ilustração de um diagrama presente no Gujin Tushu Jicheng
            (1700-1725)
          </p>
        </div>
      </div>
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">
            Os sessenta e quatro hexagramas e a mudança
          </h3>
          <p className="p-primary">
            Por esta altura já dá para ter uma noção dos vários conceitos que
            permeiam o I Ching e que se relacionam entre si para originar os
            hexagramas enquanto base fundamental deste livro e oráculo. Das
            linhas individuais e das suas diferentes características e
            fundamentação no Yin-Yang, à formação dos trigramas enquanto imagens
            dos estados de mudança e à origem dos hexagramas como junção de dois
            trigramas, evidencia-se a existência de diferentes níveis
            conceptuais, ora mais específicos, ora mais extensos que poderão ser
            considerados na interpretação dos hexagramas. O desenvolvimento de
            um modelo pessoal que segue uma linha interpretativa própria para
            guiar as leituras é muito aconselhável no meu entender, e permite
            tirar mais benefícios do estudo e uso do I Ching.
          </p>
          {/*
          <p className="p-primary">
            O significado associado aos diferentes hexagramas foi consolidado na
            forma de um texto que contém Julgamento, Imagem e Linhas (de 1 a 6)
            para cada hexagrama, o qual pode ser ainda complementado pelos
            vários Comentários existentes que elaboram sobre este texto central.
            Importa referir que o texto para as linhas fazem uma indicação
            explicita no início do número da linha, podendo ser "Nove no início
            significa" ou "Seis no início significa", isto diz respeito apenas a
            linhas móveis (6 e 9), pelo que tradicionalmente, na parte das
            linhas, apenas as linhas móveis são consideradas. Na minha opinião
            pessoal, acredito que ler todas as linhas pode ser útil,
            principalmente caso não se conheça bem o I Ching e os seus
            hexagramas, pois permite ter uma ideia mais clara sobre o
            significado do hexagrama em específico na generalidade. Além disso,
            apesar de ser nos textos que os significados de cada hexagrama se
            tornam mais tangíveis, uma leitura e interpretação prévias dos
            hexagramas à luz das imagens representadas pelos trigramas que o
            constituem pode ser uma excelente reflexão.
          </p> */}
          <p className="p-primary">
            Os hexagramas expressam situações que são simbolicamente
            caracterizadas pelas linhas, e através do movimento destas linhas
            estas situações podem mudar. Por outro lado, essa mudança não ocorre
            necessariamente, pois quando um hexagrama é composto por linhas
            apenas com os números 7 e 8, não há movimento nele, e apenas o seu
            todo é tido em conta, considerando a situação estática em termos de
            mudança. O curso de acçã. Cada situação pede uma acção adequada à
            mesma. Em qualquer situação, existe um curso de acção correcto e
            outro errado. Naturalmente, o curso de acção correcto traz boa
            fortuna e o curso de acção errado traz infortúnios. Qual é, então, a
            escolha certa para cada caso? Esta questão é um factor decisivo. É
            por causa disto que o I Ching foi levantado acima do nível de um
            qualquer livro de adivinhação. Isto porque a adivinhação consiste,
            em termos de natureza básica, em adivinhar um futuro determinado{' '}
            <i>a priori</i> e como tal podemos dizer que adivinhar o futuro
            carece de uma significação moral. Quando aconteceu pela primeira vez
            na China que alguém, ao ouvir os seus augurios do futuro, não deixou
            o assunto fechar-se e perguntou "O que devo eu fazer?", o livro de
            adivinhação teve de se tornar um livro de sabedoria.
          </p>
        </div>
        <div className="content-side">
          {' '}
          <Image
            src="/images/svg/black-bagua.svg"
            width={300}
            height={300}
            alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                (1700-1725)"
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className=" w-[225px] h-auto m-2 dark:invert"
          />
          <p className="p-caption">
            Ilustração de um diagrama presente no Gujin Tushu Jicheng
            (1700-1725)
          </p>
        </div>
      </div>
    </section>
  )
}
