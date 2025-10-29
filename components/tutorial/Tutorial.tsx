import { getCurrentUser } from '@/lib/auth/session'
import ReadingDisplay from '@/components/reading/ReadingDisplay'
import Image from 'next/image'
import Link from 'next/link'

export default async function Tutorial() {
  const user = await getCurrentUser()

  return (
    <section className="main-split">
      <h2 className="h2-title">Bem-vindo ao nosso oráculo</h2>

      <div className="flex md:flex-row flex-col justify-center">
        <div className="space-y-6 justify-text md:w-2/3 p-2 ">
          {/* <div>
            <p className="p-primary md:pl-5 text-sm">
              Sugiro que comeces por seguir as nossas instruções. Estas são
              apenas algumas das funcionalidades que temos para ti.
            </p>
          </div> */}
          <div>
            <ol className="list-decimal list-inside space-y-2 tracking-wider font-light text-sm md:text-base px-8 mx-auto md:mt-10">
              <li>
                Concentra-te em silêncio e formula uma pergunta simples e clara.
              </li>
              <li>
                Clica no botão "Leitura" para veres os hexagramas tirados.
              </li>
              <li>
                Consulta os logs para veres a lógica por detrás da tua leitura.
                Para mais informação ler sobre os{' '}
                <Link href="/sobre/metodos">
                  <u>métodos de leitura</u>
                </Link>
              </li>
              <li>
                Explora os textos associados ao Julgamento, Imagem e Linhas dos
                hexagramas. Para mais informação ler sobre alguns dos{' '}
                <Link href="/sobre/fundamentos">
                  <u>fundamentos teóricos</u> do I Ching
                </Link>
              </li>
              <li>Escreve a tua interpretação e reflexão acerca da leitura.</li>
              <li>Guarda a leitura para consulta futura.</li>
            </ol>
          </div>

          {/* ✅ Apenas em small screens */}
          <div className="pt-6 border-t border-border w-full block md:hidden">
            <ReadingDisplay isGuest={!user} />
          </div>
        </div>

        <div className="md:w-1/3 max-w-[300px] mx-auto">
          <Image
            src="/images/svg/old_guy-crop-resize.svg"
            alt="Figura ilustrativa de um ancião"
            width={300}
            height={635}
            className="w-full h-auto object-contain transition-transform duration-300 dark:invert"
            priority
          />
        </div>
      </div>

      {/* ✅ Apenas em medium e acima */}
      <div className="pt-6 border-t border-border w-full hidden md:block">
        <ReadingDisplay isGuest={!user} />
      </div>
    </section>
  )
}
