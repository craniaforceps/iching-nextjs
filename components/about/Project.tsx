'use client'
import Image from 'next/image'

export default function Project() {
  return (
    <section className="px-6 max-w-5xl mx-auto flex flex-col">
      {/* Primeiro bloco: texto à esquerda, imagem à direita */}

      <div className="flex flex-col lg:flex-row items-center lg:gap-x-0">
        <div className="lg:w-1/2 space-y-4">
          <h2 className="h2-title lg:mb-5">Chinga comigo, baby</h2>
          <h2 className="pl-2 h2-title text-left mt-0 pt-0">O contexto</h2>
          <p className="p-primary">
            O meu interesse pelo I Ching começou há mais de dez anos, após
            ter-me começado a interessar por literatura oriental, na qual
            encontrei alguns conceitos como o Yin Yang e o Tao que eventualmente
            me levaram ao I Ching.
          </p>
          <p className="p-primary">
            Recentemente decidi aprender web developing, este website pareceu-me
            a melhor forma de criar uma ferramenta útil e mostrar alguns dos
            meus conhecimentos de programação.
          </p>
        </div>
        <div className="lg:w-1/2 lg:px-10 py-5">
          <Image
            src="/images/svg/robe-guy-png.svg"
            width={755}
            height={1075}
            alt="Diagrama I Ching"
            className="w-full h-auto dark:invert"
          />
        </div>
      </div>

      {/* Segundo bloco: imagem à esquerda, texto à direita */}
      <div className="flex flex-col lg:flex-row-reverse items-center lg:gap-x-6">
        <div className="lg:w-1/2 space-y-4">
          <h2 className="pl-2 h2-title text-left">Abordagem técnica</h2>
          <p className="p-primary">
            Resumidamente usei Next.js 15, Tailwind CSS e SQLite. Inicialmente,
            usei base de dados local, mas para produção em Vercel mudei para
            Turso.
          </p>
          <p className="p-primary">
            Não usei nenhum ORM pois queria trabalhar com SQL diretamente.
          </p>
          <h3 className="text-2xl font-semibold">Funcionalidades</h3>
          <ul className="list-disc list-inside space-y-1 p-primary">
            <li>
              Simulação de consulta de leituras através do método das moedas;
            </li>
            <li>Serviços básicos de registo e login;</li>
            <li>Guardar, editar e apagar leituras;</li>
            <li>Acesso a textos para cada hexagrama;</li>
            <li>Formulário de contacto;</li>
            <li>Definições básicas: apagar conta, mudar email e password.</li>
          </ul>
        </div>{' '}
        <div className="lg:w-1/2 lg:px-8">
          <Image
            src="/images/svg/bowman.png"
            width={780}
            height={1192}
            alt="Diagrama I Ching"
            className="w-full h-auto dark:invert"
          />
        </div>
      </div>
    </section>
  )
}
