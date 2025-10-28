import { ReactNode } from 'react'
import LayoutContainer from '@/components/ui/sidebar/LayoutContainer'
import SidebarWrapper from '@/components/ui/sidebar/SidebarWrapper'

const menuLinks = [
  { href: '/dashboard/', label: 'Painel' },
  { href: '/dashboard/leituras', label: 'Nova leitura' },
  { href: '/dashboard/arquivo', label: 'Histórico de leituras' },
  { href: '/dashboard/tabelas', label: 'Tabelas' },
  { href: '/dashboard/definicoes', label: 'Definições' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      {/* Client-only - Este Wrapper foi utilizado de modo a que o layout não tenha de ser 'use client'*/}
      <SidebarWrapper links={menuLinks} />
      <div className="flex-1 flex flex-col gap-6 mt-3 md:pt-0 overflow-auto">
        {children}
      </div>
    </LayoutContainer>
  )
}
