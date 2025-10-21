// SidebarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import NavbarMobileDropdown from './NavbarMobileDropdown'

type Link = {
  href: string
  label: string
}

type SidebarWrapperProps = {
  links: Link[]
}

export default function SidebarWrapper({ links }: SidebarWrapperProps) {
  const pathname = usePathname()

  return (
    <>
      <NavbarMobileDropdown links={links} />
      <Sidebar links={links} activePath={pathname || '/dashboard/'} />
    </>
  )
}
