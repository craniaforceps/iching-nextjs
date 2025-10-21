import Button from '@/components/ui/button/Button'
import Title from '@/components/ui/Title'
import Link from 'next/link'
import SequentialHexagram from '@/components/ui/exp/SequentialHexagram'

// Homepage
export default function Homepage() {
  return (
    <section className="space-y-10">
      <div className="flex items-center mx-auto flex-col space-y-5">
        <Title title="Bem-vindo ao E-Ching" />
        <h4 className="h4-text">
          O I Ching, ou Livro das Mutações, é um antigo texto chinês usado como
          oráculo e guia filosófico há pelo menos três milénios.
        </h4>

        <div className="random-hexagram-container">
          <div className="random-hexagram">
            <SequentialHexagram />
          </div>
          <p className="p-caption">
            Sequência dos 64 hexagramas ordenados. Para mais informação acerca
            de cada hexagrama, consulta as nossas{' '}
            <Link href="/tabelas">
              <u>tabelas</u>
            </Link>
          </p>
        </div>
      </div>
      <div>
        <div className="main-section">
          <h4 className="h4-text">
            Através da interpretação dos hexagramas, podemos aprender mais sobre
            nós e sobre o fluxo que conduz o mundo.
          </h4>

          <div className="text-center mt-5">
            <Link href="/sobre/tutorial">
              <Button text="Experimenta!" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
