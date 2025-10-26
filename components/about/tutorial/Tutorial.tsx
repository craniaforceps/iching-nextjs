import dynamic from 'next/dynamic'
import Button from '@/components/ui/button/Button'
import Link from 'next/link'
import LineTable from '../fundamentals/LineTable'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/auth/session'
import CoinTossDemo from './CoinTossDemo'

// ✅ This is a SERVER COMPONENT
export default async function Tutorial() {
  // Client-only component (CoinTossDemo) must be dynamically imported with SSR disabled
  // const CoinMethodDemo = dynamic(() => import('./CoinTossDemo'), { ssr: false })

  // Fetch the currently logged-in user from your session helper
  const user = await getCurrentUser()

  return (
    <section className="main-section">
      {/* -------------------- SECTION 1 -------------------- */}
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
            são assim constituídos por um trigrama superior e um trigrama
            inferior.
          </p>
        </div>
        <div className="content-side"></div>
      </div>

      {/* -------------------- SECTION 2 -------------------- */}
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
        <div className="content-side"></div>
      </div>

      {/* -------------------- SECTION 3 -------------------- */}
      <div className="content-split">
        <div className="content-main">
          <h3 className="h3-title">O método das moedas</h3>

          <p className="p-primary">
            Usando o método das moedas, começamos por fazer o lançamento com
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

          {/* Client-only demo component */}
          <CoinTossDemo />

          <p className="p-primary">
            Após o registo no nosso website terás acesso a diferentes
            funcionalidades que facilitam em muito tanto o processo de divinação
            como o de interpretação do I Ching.
          </p>

          <div className="text-center items-center flex mx-auto mt-3">
            {/* ✅ Button is hidden when user is logged in */}
            {!user && (
              <Link href="/registo">
                <Button text="Inscreve-te" type="button" />
              </Link>
            )}
          </div>
        </div>
        <div className="content-side"></div>
      </div>
    </section>
  )
}
