import Image from 'next/image'

const DragonExp = () => {
  return (
    <div className="flex lg:w-200 lg:h-30 relative overflow-hidden rounded-lg group">
      {/* Imagem de fundo */}
      <Image
        src="/images/svg/dragon2.svg" // caminho da imagem
        alt="Descrição da imagem"
        height={800}
        width={1195}
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
  )
}
export default DragonExp
