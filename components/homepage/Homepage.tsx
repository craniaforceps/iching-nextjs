import Button from '@/components/ui/button/Button'
import Title from '@/components/ui/Title'
import Link from 'next/link'
import SequentialHexagram from '@/components/ui/exp/SequentialHexagram'
import Image from 'next/image'
import { useMemo } from 'react'

// Homepage
export default function Homepage() {
  return (
    <section className="space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center mx-auto flex-col space-y-3">
        <div className="mt-3 mb-0">
          <Title title="Bem-vindo ao E-Ching" />
        </div>

        <h4 className="h4-text text-lg">
          O I Ching, ou Livro das Mutações, é um antigo texto chinês usado como
          oráculo e guia filosófico há pelo menos três milénios.
        </h4>
      </div>
      <div className="text-center mt-5">
        <div className="flex justify-center mx-auto items-center group-hover:scale-105">
          <Link href="tutorial">
            <div className="flex w-32 h-85 lg:w-50 lg:h-137 relative overflow-hidden rounded-lg group">
              {/* Imagem de fundo */}
              <Image
                src="/images/svg/human.svg" // caminho da imagem
                alt="Descrição da imagem"
                fill // faz a imagem preencher o container
                className="filter dark:invert 0 w-full h-auto duration-300 "
                style={{
                  objectFit: 'cover',
                  objectPosition: '10% 70%',
                }}
                // mantém proporção e cobre o quadrado
              />

              {/* Texto sobre a imagem */}
              {/* <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
                    Leituras
                  </div> */}
            </div>
          </Link>
          <Link href="tutorial">
            <div className="flex w-32 h-85 lg:w-50 lg:h-137 relative overflow-hidden rounded-lg group transform -scale-x-100">
              {/* Imagem de fundo */}
              <Image
                src="/images/svg/human.svg" // caminho da imagem
                alt="Descrição da imagem"
                fill // faz a imagem preencher o container
                className="filter dark:invert 0 w-full h-auto duration-300"
                style={{
                  objectFit: 'cover',
                  objectPosition: '10% 70%',
                }}
                // mantém proporção e cobre o quadrado
              />

              {/* Texto sobre a imagem */}
              {/* <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
                    Leituras
                  </div> */}
            </div>
          </Link>
        </div>
        <div className="relative -top-50 lg:-top-75">
          <Link href="tutorial">
            <button
              type="button"
              className="text-xs lg:text-sm p-2 border cursor-pointer rounded-sm shadow-lg
             hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500
             w-auto dark:bg-stone-900/85 bg-white/85 font-bold"
            >
              Consulta o I Ching!
            </button>
          </Link>
        </div>
        <div className="flex items-center mx-auto flex-col space-y-3">
          <h4 className="h4-text text-lg">
            Através da interpretação dos hexagramas, podemos aprender mais sobre
            nós e sobre o fluxo que conduz o mundo.
          </h4>
        </div>
      </div>

      <div>
        <div className="main-section">
          {/* <div className="random-hexagram-container">
            <div className="random-hexagram">
              <SequentialHexagram />
            </div>
            <p className="p-caption mt-5 text-sm px-4">
              Sucessão dos 64 hexagramas ordenados em ordem crescente.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  )
}
