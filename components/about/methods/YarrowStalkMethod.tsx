'use client'
import { useState } from 'react'
import Image from 'next/image'
import AccordionItem from '../../ui/AccordionItem'
import StalkTutorial from './YarrowStalkTutorial'
import YarrowStalkTable from './YarrowStalkTable'

export default function YarrowStalkMethod() {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => setIsOpen(!isOpen)

  return (
    <div className="content-split">
      <div className="content-main">
        <h3 className="h3-title">O método dos talos de milefólio</h3>
        <p className="p-primary">
          O método dos talos de miléfolio é visto como o método clássico e foi
          desenvolvido na dinastia Zhou (entre 1046-256 a.C.), ou possivelmente
          até antes. Os hexagramas e linhas nos seus movimentos e mudanças
          reproduzem os movimentos e mudanças do macrocosmo. Através do uso dos
          talos de milefólio, conseguimos um ponto de vista a partir do qual é
          possível avaliar as condições das coisas. A partir desta perspetiva,
          as palavras do oráculo indicarão o que deve ser feito para atender à
          necessidade do momento.
        </p>
        <p className="p-primary">
          Este processo era visto como misterioso, todavia, apenas no sentido em
          que a manipulação dos talos torna a inconsciência do praticante
          activa. Nem todos os indivíduos estão igualmente capacitados para
          consultar o oráculo. Isto requer uma mente calma e tranquila,
          receptiva às influências cósmicas escondidas na humilde divinação com
          os talos. Como produto do reino vegetal, estes eram considerados como
          relacionados com as fontes da vida. Os talos eram derivados de uma
          planta vista como sagrada.
        </p>
        <p className="p-primary">
          Abaixo estão indicadas as probabilidades de tirar diferentes tipo de
          linhas. Conseguimos evidenciar que apesar da probabilidade de se tirar
          linha yin ou linha yang ser a mesma (8/16, ou seja 50% para cada), a
          probabilidade de tirar linhas mutantes é inferior a tirar linhas fixas
          (4/16 vs 12/16). E que dentro das linhas mutantes, a probabilidade de
          tirar uma linha ying mutante é de apenas 1/16.
        </p>

        <YarrowStalkTable />
        <AccordionItem title="Tutorial" isOpen={isOpen} onToggle={onToggle}>
          <StalkTutorial />
        </AccordionItem>
      </div>

      <div className="content-side">
        <Image
          src="/images/yarrow-stalks.jpg"
          width={250}
          height={333}
          alt="A planta Achillea millefolium usada no método dos talos de miléfolio. Em Portugal esta planta é frequente no norte do país."
          quality={75}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="rounded-full   w-48 md:w-[225px] h-auto"
        />
        <p className="p-caption">
          Os talos retirados do milefólio, limpos e secos. Prontos para serem
          usados para efeitos de divinação.
        </p>
      </div>
    </div>
  )
}
