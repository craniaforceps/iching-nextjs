import Image from 'next/image'
import Link from 'next/link'
Link

export default function Dashboard() {
  return (
    <section className="main-split space-y-8">
      <h2 className="h2-title">Bem-vindo ao E-Ching</h2>
      <p className="p-primary px-5  mx-auto text-xl">
        Aqui poderás fazer novas leituras, consultar o histórico das mesmas e
        também tabelas do I Ching.
      </p>

      <div className="flex lg:flex-row flex-col items-center gap-1 mx-auto justify-center">
        <Link href="dashboard/leituras">
          {/* Imagem de fundo */}
          <div className="flex md:w-55 md:h-55 w-64 h-64 top-5 relative overflow-hidden rounded-lg group">
            <Image
              src="/images/svg/snake-crop.png" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              className="filter dark:invert w-full h-auto group-hover:scale-75 scale-70"
              style={{
                objectFit: 'cover',
                objectPosition: '10% 80%',
              }} // mantém proporção e cobre o quadrado
            />
            {/* Texto sobre a imagem */}
            <div className="absolute top-2 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
              Leituras
            </div>
          </div>
        </Link>
        <Link href="dashboard/arquivo">
          <div className="flex md:w-55 md:h-55 w-64 h-64 relative overflow-hidden rounded-lg group">
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

        <Link href="dashboard/tabelas">
          <div className="flex md:w-55 md:h-55 w-64 h-64 relative overflow-hidden rounded-lg group">
            {/* Imagem de fundo */}
            <Image
              src="/images/svg/dragon.svg" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              className="filter dark:invert 0 w-full h-auto duration-300 group-hover:scale-105 "
              style={{
                objectFit: 'cover',
                objectPosition: '10% 70%',
              }}
              // mantém proporção e cobre o quadrado
            />
            {/* Texto sobre a imagem */}
            <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl   font-bold">
              Tabelas
            </div>
          </div>
        </Link>
      </div>
      <div>
        {' '}
        <p className="p-primary px-5">
          Esta ainda é a versão piloto do E-Ching. Se encontrarem erros ou
          tiverem críticas e sugestões, podem contactar-me através do formulário
          nas{' '}
          <Link href="dashboard/definicoes">
            <u>definições.</u>
          </Link>{' '}
        </p>
      </div>

      <div>
        <div className="flex justify-center mx-auto mt-5">
          {' '}
          <Image
            src="/images/svg/yinyang_bagua.svg"
            width={250}
            height={250}
            quality={75}
            alt="De acordo com a tradição, o I Ching remonta a cerca de 5000 anos atrás (2800–2737 a.C.), quando o lendário imperador Fu Xi (伏羲) teria descoberto os oito trigramas, Ba Gua (八卦) ao observar padrões na natureza"
            priority
            className="rounded-full  h-auto m-2 dark:invert hover:scale-105"
          />
        </div>

        <p className="p-caption text-center">
          Uma ilustração do Gujin Tushu Jicheng (1700-1725).
        </p>
      </div>
    </section>
  )
}
