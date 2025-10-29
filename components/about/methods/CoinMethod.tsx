'use client'
import { useState } from 'react'
import Image from 'next/image'
import AccordionItem from '../../ui/AccordionItem'
import CoinTutorial from './CoinTutorial'
import CoinTable from './CoinTable'

export default function CoinMethod() {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => setIsOpen(!isOpen)

  return (
    <div className="content-split">
      {/* Coluna principal */}
      <div className="content-main">
        <h3 className="h3-title">O método das moedas</h3>

        <p className="p-primary">
          O método das moedas tradicionalmente baseia-se na utilização de três
          moedas de bronze chinesas, com um buraco no meio e uma inscrição num
          dos lados, mas tecnicamente qualquer moeda com duas faces diferentes
          poderá ser utilizada. Este método surgiu na dinastia Han (entre
          206-164 a.C.) e tornou-se o método mais popular a partir da idade
          média chinesa, durante as dinastias Tang (618-907) e Song (960-1279).
        </p>

        <p className="p-primary">
          Neste método as probabilidades são as mesmas para cada tipo de linha,
          ao contrário do método dos talos de milefólio, onde existem nuances
          tendo em conta se as linhas são mutáveis ou fixas, ou yin ou yang.
          Apesar de ser um método mais prático, os seus resultados tecnicamente
          são diferentes dos métodos mais tradicionais.
        </p>

        <CoinTable />

        <AccordionItem title="Tutorial" isOpen={isOpen} onToggle={onToggle}>
          <CoinTutorial />
        </AccordionItem>
      </div>

      {/* Coluna lateral */}
      <div className="content-side">
        <Image
          src="/images/coins.jpg"
          width={250}
          height={188}
          alt="Exemplo do tipo de moedas tipicamente utilizada no método das moedas"
          quality={75}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="rounded-full  w-48 md:w-[225px] h-auto"
        />
        <p className="p-caption">
          Exemplo do tipo de moedas tipicamente utilizada no método das moedas.
        </p>
      </div>
    </div>
  )
}
