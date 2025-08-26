'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

const baseLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
]

const authNavLinks = [
  // { href: '/leituras', label: 'Leituras' },
  // { href: '/tabelas', label: 'Tabelas' },
  // { href: '/arquivo', label: 'Arquivo' },
  { href: '/dashboard', label: 'Dashboard' },
]

const notAuthNavLinks = [
  { href: '/login', label: 'Login' },
  { href: '/registo', label: 'Registo' },
]

type Props = {
  onLinkClick?: () => void
}

export default function NavbarLinks({ onLinkClick }: Props) {
  const router = useRouter()
  const { isAuthenticated, refreshAuth } = useAuth()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    refreshAuth()
    router.push('/')
    onLinkClick?.()
  }

  const renderLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      key={href}
      href={href}
      onClick={onLinkClick}
      className="hover:text-amber-500 transition"
    >
      {label}
    </Link>
  )

  return (
    <>
      {baseLinks.map(renderLink)}

      {isAuthenticated ? (
        <>
          {authNavLinks.map(renderLink)}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        notAuthNavLinks.map(renderLink)
      )}
    </>
  )
}
