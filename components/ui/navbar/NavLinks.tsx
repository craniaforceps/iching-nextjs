'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

const baseLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
]

type NavItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'action'; label: string; onClick: () => void }

export default function NavbarLinks({
  onLinkClick,
}: {
  onLinkClick?: () => void
}) {
  const router = useRouter()
  const { isAuthenticated, refreshAuth } = useAuth()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    refreshAuth()
    router.push('/')
    onLinkClick?.()
  }

  const authNavLinks: NavItem[] = [
    { type: 'link', href: '/dashboard', label: 'Dashboard' },
    { type: 'action', label: 'Logout', onClick: handleLogout },
  ]

  const notAuthNavLinks: NavItem[] = [
    { type: 'link', href: '/login', label: 'Login' },
    { type: 'link', href: '/registo', label: 'Registo' },
  ]

  const renderNavItem = (item: NavItem) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className="hover:text-amber-500 transition"
        >
          {item.label}
        </Link>
      )
    } else {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className="hover:text-red-500 transition"
        >
          {item.label}
        </button>
      )
    }
  }

  return (
    <>
      {baseLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className="hover:text-amber-500 transition"
        >
          {item.label}
        </Link>
      ))}
      {isAuthenticated
        ? authNavLinks.map(renderNavItem)
        : notAuthNavLinks.map(renderNavItem)}
    </>
  )
}
