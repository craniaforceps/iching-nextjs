'use client'
import Image from 'next/image'

import TrigramTable from './TrigramTable'

export default function Fundamentals() {
  return (
    <section className="main-section">
      <div className="content-split">
        {/* TEXTO À ESQUERDA */}
        <div className="content-main">
          <h2 className="h2-title">Yin yang, trigramas e hexagramas</h2>
          <p className="p-primary">
            Inicialmente, o Livro das Mutações era uma colecção de sinais
            lineares que eram usados como oráculos. Na antiguidade, oráculos
            eram usados em múltiplas circunstâncias, sendo os mais antigos
            destes reduzidos a respostas como "sim" ou "não". Este tipo de
            oráculo é provavelmente a base do I Ching. "Sim" (ou yang) era
            indicado por uma linha int (———) e o "Não" (ou yin) por uma linha
            partida (— —). Todavia, a necessidade de maior diferenciação parece
            ter sido sentida numa idade precoce e estas linhas simples foram
            combinadas em pares.. A estas combinações foi adicionada uma
            terceira linha, e assim surgiram os oito trigramas conhecidos. Estes
            trigramas foram concebidos como imagens de tudo aquilo que acontece
            no céu e na terra. Em simultâneo, também parecem possuir um estado
            de transição contínua, um alterando-se para outro, como uma
            transição de um fenómeno para o outro está continuamente a tomar
            lugar no mundo físico. Aqui temos o conceito fundamental de Livro
            das Mutações. Os oito trigramas como símbolos que representam
            estados transicionais. São imagens que estão constantemente em
            mudança. Assim a atenção concentra-se não nas coisas no seu estado
            de ser, mas sim nos seus movimentos em mudança. Resumindo, os
            trigramas não são representações das coisas como tal, mas das suas
            tendências em movimento.
          </p>
          <TrigramTable />{' '}
        </div>

        {/* IMAGEM À DIREITA */}
        <div className="content-side">
          {' '}
          <Image
            src="/images/iching-diagram.jpg"
            width={300}
            height={300}
            alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                (1700-1725)"
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            Ilustração de um diagrama presente no Gujin Tushu Jicheng
            (1700-1725)
          </p>
          <Image
            src="/images/trigrams-tibet.jpg"
            width={250}
            height={188}
            alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                (1700-1725)"
            quality={75}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            Representação da "Tábua Mística". Contém o escudo da tartaruga
            (aludindo ao animal que revelou os trigramas a Fuxi e que foi, de
            acordo com relatos canónicos, um cavalo-dragão), um quadro com os 8
            hexagramas, as 12 figuras do ciclo chinês dos animais.
          </p>
        </div>
      </div>
      {/* <div className="content-split">
        <div className="content-main">
          <TrigramTable />{' '}
        </div> */}

      <div className="content-side "></div>
    </section>
  )
}
