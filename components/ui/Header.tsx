'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import DarkModeToggle from './DarkModeButton'
import YinYangSymbol from '@/public/yin-yang.svg'
// import AuthButtons from './AuthButtons'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/leituras', label: 'Leituras' },
  { href: '/tabelas', label: 'Tabelas' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/historico', label: 'Histórico' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="max-w-3xl mx-auto p-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-1 font-bold text-lg">
        <YinYangSymbol className="w-5 h-5 text-amber-500" />I Ching
      </div>

      {/* DESKTOP */}
      <nav className="hidden md:flex gap-x-6">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm md:text-base py-2 dark:hover:text-amber-500 hover:text-amber-500"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <DarkModeToggle />

        {/* MOBILE */}
        <button
          className="md:hidden p-2 hover:scale-105 dark:hover:text-amber-500"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden z-10">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 border-b border-gray-300 dark:border-gray-700 hover:text-amber-500"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
