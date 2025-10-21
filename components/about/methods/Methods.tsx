import Image from 'next/image'

import YarrowStalk from './YarrowStalkMethod'
import CoinMethod from './CoinMethod'

export default function Methods() {
  return (
    <section className="main-section">
      <div className="content-split">
        {' '}
        <div className="content-main">
          {' '}
          <h2 className="h2-title">Os métodos de divinação</h2>
          <p className="p-primary">
            Na generalidade existem dois métodos de consultar o I Ching: através
            de três moedas ou através de cinquenta talos de{' '}
            <i>Achillea millefolium</i>, também conhecido por milefólio. Apesar
            de em última instância ambos serem parecidos no seu fundamental,
            especialmente no que diz respeito aos valores associados a cada tipo
            de linha, têm diferenças significativas ao nível da probabilidade de
            cada hexagrama.
          </p>
          <p className="p-primary">
            Neste momento o website só suporta a lógica de divinação associada
            ao método das moedas tradicional, mas planeio futuramente integrar
            tanto o método dos talos de milefólio, tal como o método das moedas
            modificadas que permite o uso mais prático das moedas mas que
            origina as mesmas probabilidades que o método do milefólio.
          </p>
          <p className="p-primary">
            Idealmente, quando novos métodos forem implementados, tentarei, na
            medida do possível, também demonstrar a forma como essa lógica foi
            programada de modo a garantir alguma fidelidade tanto no que diz
            respeito aos passos dos rituais como às probabilidades resultantes.
          </p>
        </div>
        <div className="content-side">
          <Image
            src="/images/achillea.jpeg"
            width={250}
            height={375}
            alt="A planta Achillea millefolium usada no método dos talos de miléfolio. Em Portugal esta planta é frequente no norte do país."
            quality={75}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-full border border-white w-[225px] h-auto m-2"
          />
          <p className="p-caption">
            A espécie <i>Achillea millefolium</i> é vista como sagrada para os
            chineses, e os seus talos são usados num dos mais antigos métodos de
            divinação de I Ching. Em Portugal esta planta é frequente no norte
            do país.
          </p>
        </div>
      </div>

      <CoinMethod />
      <YarrowStalk />
    </section>
  )
}
