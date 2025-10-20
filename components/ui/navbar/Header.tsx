'use client'

import { useState } from 'react'
import Logo from './Logo'
import HeaderActions from './HeaderActions'
import NavbarLinks from './NavbarLinks'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-stone-900 border-b-1">
      <div className="max-w-7xl mx-auto p-4 py-2 flex items-center justify-between">
        <Logo />

        {/* Desktop */}
        <nav className="hidden md:flex gap-x-6">
          <NavbarLinks onLinkClick={() => setMenuOpen(false)} />
        </nav>

        <HeaderActions
          menuOpen={menuOpen}
          toggleMenu={() => setMenuOpen((prev) => !prev)}
        />
      </div>

      <MobileMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  )
}
