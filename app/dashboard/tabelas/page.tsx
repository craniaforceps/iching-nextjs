'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const Tabelas = dynamic(() => import('@/components/tables/Tables'), {
  ssr: false, // se não precisa de server-side
})

export default function TabelasPage() {
  return (
    <main className="main-dashboard">
      <div className="hidden md:block lg:block">
        <h2 className="h2-title">Tabelas</h2>
      </div>
      <div className="relative -top-7 w-full h-100 lg:h-[350px] ">
        <Image
          src="/images/svg/dragon-chop.svg"
          alt="Descrição da imagem"
          fill
          priority
          className="object-contain w-full h-full p-0 hover:scale-105 dark:invert"
        />
      </div>

      <Tabelas />
    </main>
  )
}
