'use client'

import { ReactNode } from 'react'
import LayoutContainer from '@/components/ui/sidebar/LayoutContainer'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import { usePathname } from 'next/navigation'
import NavbarMobileDropdown from '@/components/ui/sidebar/NavbarMobileDropdown'

const tabs = [
  { id: 'contexto', label: 'Contexto', href: '/sobre/contexto' },
  { id: 'fundamentos', label: 'Fundamentos', href: '/sobre/fundamentos' },
  { id: 'metodos', label: 'Métodos', href: '/sobre/metodos' },
  { id: 'tutorial', label: 'Tutorial', href: '/sobre/tutorial' },
  { id: 'projecto', label: 'Projecto', href: '/sobre/projecto' },
]

export default function SobreLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <LayoutContainer>
      <NavbarMobileDropdown links={tabs} />
      <Sidebar links={tabs} activePath={pathname} />

      <div className="flex-1 flex flex-col gap-6 mt-3 md:pt-0">{children}</div>
    </LayoutContainer>
  )
}
