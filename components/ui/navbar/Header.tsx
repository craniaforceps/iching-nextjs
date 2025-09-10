'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import DarkModeToggle from '@/components/ui/button/DarkModeButton'
import YinYangSymbol from '@/public/yin-yang.svg'
import NavbarLinks from './NavLinks'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  // dark:bg-stone-900
  return (
    <header className="fixed top-0 left-0 w-full z-50  bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto p-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center py-0 gap-1 font-bold text-lg">
          <YinYangSymbol className="w-5 h-5 text-amber-500" />I Ching
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex gap-x-6">
          <NavbarLinks onLinkClick={() => setMenuOpen(false)} />
        </nav>

        {/* Ações: DarkMode + Menu Mobile */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button
            className="md:hidden p-2 hover:scale-105 dark:hover:text-amber-500"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white dark:bg-stone-900 shadow-md md:hidden z-[999]">
          <div className="flex flex-col p-4 gap-2">
            <NavbarLinks onLinkClick={() => setMenuOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  )
}
