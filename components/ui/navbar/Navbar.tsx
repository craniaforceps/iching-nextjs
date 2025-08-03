'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import NavbarLinks from '../NavLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' })
        setIsAuthenticated(res.ok)
      } catch (err) {
        console.log('Error ao verificar autenticação:', err)
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <nav className="flex items-center gap-4">
      {/* Links desktop */}
      <div className="hidden md:flex gap-x-6">
        <NavbarLinks isAuthenticated={isAuthenticated} />
      </div>

      {/* Hamburger mobile */}
      <button
        className="md:hidden hover:scale-105 dark:hover:border-amber-500 dark:hover:text-amber-500"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile dropdown */}
      {open && (
        <div className="fixed top-[64px] left-0 right-0 bg-white dark:bg-gray-500 z-50 p-4 md:hidden max-w-3xl mx-auto border-b border-gray-300 dark:border-gray-700">
          <NavbarLinks isAuthenticated={isAuthenticated} />
        </div>
      )}
    </nav>
  )
}
