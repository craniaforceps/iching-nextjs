'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/leituras', label: 'Leituras' },
  { href: '/tabelas', label: 'Tabelas' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/historico', label: 'Histórico' },
]

export default function NavbarLinks() {
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="block dark:hover:border-amber-500 dark:hover:text-amber-500 text-sm md:text-base py-2 border-b md:border-none"
        >
          {label}
        </Link>
      ))}
    </>
  )
}
