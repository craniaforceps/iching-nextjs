'use client'

import dynamic from 'next/dynamic'

const Tabelas = dynamic(() => import('@/components/tables/Tables'), {
  ssr: false, // se não precisa de server-side
})

export default function TabelasPage() {
  return (
    <main className="main-dashboard">
      <div className="hidden md:block lg:block">
        <h2 className="h2-title">Tabelas</h2>
      </div>
      <Tabelas />
    </main>
  )
}
