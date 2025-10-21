import dynamic from 'next/dynamic'
import Button from '@/components/ui/button/Button'
import Link from 'next/link'
import LineTable from '../fundamentals/LineTable'
import Image from 'next/image'

export default function Tutorial() {
  const CoinMethodDemo = dynamic(() => import('./CoinTossDemo'), { ssr: false })

  return (
    <section className="main-section">
      <div className="content-split">
        <div className="content-main">
          <h2 className="h2-title">Como consultar o I Ching</h2>
          <h3 className="h3-title">Trigramas e hexagramas</h3>
          <p className="p-primary">
            Na formação dos hexagramas que constituem o I Ching existem vários
            conceitos que devem ser tidos em conta. A um nível mais atómico, na
            formação das linhas, temos a dicotomia do yin-yang. Por sua vez, na
            soma de cada três linhas são constituidos os trigramas, que
            representam a qualidade mutante de todas as coisas. Os hexagramas
            são assim constitúidos por um trigrama superior e um trigrama
            inferior.
          </p>
        </div>
        <div className="content-side">
          {' '}
          <Image
            src="/images/leibniz-diagrams.webp"
            width={250}
            height={240}
            alt="Um diagrama com os hexagramas do I Ching enviado a G. W. Leibniz pelo jesuíta Joachim Bouvet em 1701. O diagrama mostra a relação entre o I Ching e a aritmética binária."
            quality={75}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            Um diagrama com os hexagramas do I Ching enviado a G. W. Leibniz
            pelo jesuíta Joachim Bouvet em 1701. O diagrama mostra a relação
            entre o I Ching e a aritmética binária.
          </p>
        </div>
      </div>
      <div className="content-split">
        <div className="content-main">
          <h4 className="h3-title">Linhas e mudança</h4>
          <p className="p-primary">
            Um aspecto fundamental começa por ser como determinar cada linha.
            Como demonstrado em <Link href="/metodos">métodos</Link>, isto é
            feito através da obtenção de quatro valores, 6, 7, 8 e 9, que irão
            corresponder aos quatro tipos de linhas. Devido ao facto de poderem
            haver linhas mutantes, decorrente de uma leitura podemos obter dois
            hexagramas e não apenas um, ainda que também seja possível obter
            apenas um caso todas as linhas resultantes sejam fixas. O primeiro
            hexagrama gerado pode ser visto como o original, enquanto que o
            segundo é o mutante. As diferenças, como referido, dizem apenas
            respeito à mutabilidade das linhas.
          </p>
          <LineTable />
        </div>
        <div className="content-side">
          <Image
            src="/images/yin-yang-scroll.jpg"
            width={300}
            height={413}
            alt=" Pintura num pergaminho com três sábios a estudarem o Yin Yang com
            três crianças e um veado (Século XVIII)."
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            Pintura num pergaminho com três sábios a estudarem o Yin Yang com
            três crianças e um veado (Século XVIII).
          </p>
        </div>
      </div>
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">O método das moedas</h3>

          <p className="p-primary">
            Usando o método das moedas, começamos por fazer o lançamento das com
            três moedas. Consoante a face, somamos diferentes valores. Para cara
            somamos 3 e para coroa somamos 2. Isto fará com que obtenhamos um
            valor por linha que pode ser 6, 7, 8 e 9, tal como referimos. Com a
            sequência de somas obtidas poderemos calcular os nossos hexagramas.
            Com esse propósito, podemos substituir a sequência de valores por
            binários para os dois hexagramas gerados, ou pura e simplesmente
            desenhá-los numa folha de papel. Por fim, de modo a consultar o
            livro e perceber qual o hexagrama gerado, podemos usar as{' '}
            <Link href="/tabelas">
              <u>tabelas</u>
            </Link>
            , em particular a que faz o cruzamento entre os oito trigramas, e
            assim consultar a informação de que precisamos.
          </p>

          {/* Segundo Accordion */}

          <CoinMethodDemo />

          <p className="p-primary">
            Após o registo no nosso website terás acesso a diferentes
            funcionalidades que facilitam em muito tanto o processo de divinação
            como o de interpretação do I Ching.
          </p>
          <div className="text-center items-center flex mx-auto mt-3">
            <Link href="/registo">
              <Button text="Inscreve-te" type="button" />
            </Link>
          </div>
        </div>
        <div className="content-side"></div>
      </div>
    </section>
  )
}
