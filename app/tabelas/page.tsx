'use client'

import Title from '@/components/ui/Title'
import dynamic from 'next/dynamic'

const Tabelas = dynamic(() => import('@/components/tables/Tables'), {
  ssr: false, // se não precisa de server-side
})

export default function TabelasPage() {
  return (
    <main className="page-content">
      <Title title="Tabelas" />
      <div className="flex justify-center">
        <Tabelas />
      </div>
    </main>
  )
}
