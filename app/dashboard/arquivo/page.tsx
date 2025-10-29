import ArchiveDisplay from '@/components/archive/ArchiveDisplay'
import Image from 'next/image'

// Página do arquivo
export default function ArquivoPage() {
  return (
    <main className="main-dashboard max-w-full space-y-0">
      <section className="main-split w-full gap-0">
        <h2 className="h2-title">Histórico</h2>
        <div className="relative w-full -top-10 h-100 lg:h-[350px] ">
          <Image
            src="/images/svg/tiger-chop.svg"
            alt="Descrição da imagem"
            fill
            priority
            className="object-contain w-full h-full p-0 hover:scale-105 transform dark:invert"
          />
        </div>

        <ArchiveDisplay />
      </section>

      {/* Imagem de fundo embaixo */}
    </main>
  )
}
