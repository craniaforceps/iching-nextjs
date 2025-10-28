'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

// ------------------------
// Tipos
// ------------------------
type LinkItem = { type: 'link'; href: string; label: string }
type ActionItem = { type: 'action'; label: string; onClick: () => void }
type NavItem = LinkItem | ActionItem

// ------------------------
// Links base
// ------------------------
const baseLinks: LinkItem[] = [
  { type: 'link', href: '/', label: 'Início' },
  { type: 'link', href: '/sobre', label: 'Sobre' },
]

// ------------------------
// NavbarLinks Component
// ------------------------
interface NavbarLinksProps {
  onLinkClick?: () => void
}

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, refreshAuth } = useAuth()

  // ------------------------
  // Função de Logout
  // ------------------------
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    refreshAuth()
    router.push('/')
    onLinkClick?.()
  }

  // ------------------------
  // Links por autenticação
  // ------------------------
  const authNavLinks: NavItem[] = [
    { type: 'link', href: '/dashboard', label: 'Painel' },
    { type: 'action', label: 'Logout', onClick: handleLogout },
  ]

  const notAuthNavLinks: NavItem[] = [
    { type: 'link', href: '/login', label: 'Login' },
    { type: 'link', href: '/registo', label: 'Registo' },
  ]

  // ------------------------
  // Renderiza cada NavItem
  // ------------------------
  const renderNavItem = (item: NavItem) => {
    if (item.type === 'link') {
      const isActive =
        pathname === item.href ||
        (item.href !== '/' && pathname.startsWith(item.href))

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={`transition tracking-wide cursor-pointer text-md lg:text-lg xl:text-xl 2xl:text-xl ${
            isActive
              ? 'text-amber-500 font-semibold'
              : 'hover:text-amber-500 text-stone-900 dark:text-gray-200'
          }`}
        >
          {item.label}
        </Link>
      )
    }

    // type === 'action'
    return (
      <button
        key={item.label}
        onClick={item.onClick}
        className="hover:text-red-500 transition cursor-pointer text-left text-md lg:text-lg xl:text-xl 2xl:text-xl"
      >
        {item.label}
      </button>
    )
  }

  return (
    <>
      {/* Links base */}
      {baseLinks.map(renderNavItem)}

      {/* Links por autenticação */}
      {(isAuthenticated ? authNavLinks : notAuthNavLinks).map(renderNavItem)}
    </>
  )
}
