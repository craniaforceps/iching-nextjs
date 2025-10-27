import Image from 'next/image'
import Link from 'next/link'
Link

export default function Dashboard() {
  return (
    <section className="main-split">
      <h2 className="h2-title">Bem-vindo ao E-Ching</h2>
      <p className="p-primary">
        Obrigado por te teres inscrito neste website, espero que possas fazer
        bom proveito do mesmo.
      </p>
      <div className="flex lg:flex-row flex-col items-center gap-1 mx-auto justify-center">
        <Link href="dashboard/leituras">
          <div className="flex w-64 h-64 relative overflow-hidden rounded-lg group">
            {/* Imagem de fundo */}
            <Image
              src="/images/svg/dragon.svg" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              className="filter dark:invert 0 w-full h-auto duration-300 group-hover:scale-105"
              style={{
                objectFit: 'cover',
                objectPosition: '10% 70%',
              }}
              // mantém proporção e cobre o quadrado
            />

            {/* Texto sobre a imagem */}
            <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
              Leituras
            </div>
          </div>
        </Link>
        <Link href="dashboard/arquivo">
          <div className="flex w-64 h-64 relative overflow-hidden rounded-lg group">
            {/* Imagem de fundo */}
            <Image
              src="/images/svg/tiger.svg" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              className="filter dark:invert w-full h-auto group-hover:scale-105 "
              style={{
                objectFit: 'cover',
                objectPosition: '10% 85%',
              }} // mantém proporção e cobre o quadrado
            />

            {/* Texto sobre a imagem */}
            <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
              Histórico
            </div>
          </div>
        </Link>

        <Link href="dashboard/definicoes">
          <div className="flex w-64 h-64 relative overflow-hidden rounded-lg group">
            {/* Imagem de fundo */}
            <Image
              src="/images/svg/peacock_test.svg" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              className="filter dark:invert -rotate-4 w-full h-auto group-hover:scale-105"
              style={{
                objectFit: 'cover',
                objectPosition: '10% 80%',
              }} // mantém proporção e cobre o quadrado
            />

            {/* Texto sobre a imagem */}
            <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl   font-bold">
              Definições
            </div>
          </div>
        </Link>
      </div>
      <p className="p-primary">
        Esta é a versão inicial e mais básica do E-Ching. Neste momento muita da
        informação ainda se encontra em inglês, mas um dos objectivos passa por
        fazer as traduções dos textos para português.
      </p>
      <p className="p-primary">As funcionalidades desta versão são:</p>
      <ul className="list-text space-y-3 text-left">
        <li>
          <strong>Leituras:</strong> Faz uma questão ao oráculo e clica no botão
          para gerares uma leitura e explorar os textos associados à mesma;
        </li>
        <li>
          <strong>Arquivo:</strong> Permite consultar, apagar e editar leituras
          antigas;
        </li>
        <li>
          <strong>Definições:</strong> Permite alterar algumas das configurações
          básicas da conta, como mudar a password, email ou apagar a conta;
        </li>
      </ul>
      <p className="p-primary">
        Como referido, esta é uma versão inicial, e espero nos próximos tempos
        implementar mais algumas coisas que me parecem úteis para o estudo do I
        Ching.
      </p>
      <div className="flex justify-center mx-auto mt-5">
        {' '}
        <Image
          src="/images/yin_yang_and_trigrams.gif"
          width={250}
          height={250}
          quality={75}
          alt="De acordo com a tradição, o I Ching remonta a cerca de 5000 anos atrás (2800–2737 a.C.), quando o lendário imperador Fu Xi (伏羲) teria descoberto os oito trigramas, Ba Gua (八卦) ao observar padrões na natureza"
          priority
          className="rounded-full border border-white w-[225px] h-auto m-2"
        />
      </div>

      <p className="p-caption text-center">
        Uma ilustração do Gujin Tushu Jicheng (1700-1725).
      </p>
    </section>
  )
}
