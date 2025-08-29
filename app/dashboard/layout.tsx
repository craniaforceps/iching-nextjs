'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

const menuLinks = [
  { href: '/dashboard/leituras', label: 'Leituras' },
  { href: '/dashboard/tabelas', label: 'Tabelas' },
  { href: '/dashboard/arquivo', label: 'Arquivo' },
  { href: '/dashboard/definicoes', label: 'Definições' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto transition-colors relative">
      {/* Navbar mobile */}
      <nav className="flex w-full justify-center shadow-md py-2 sticky top-[60px] z-10 bg-white dark:bg-stone-900 md:hidden">
        <div className="flex w-full max-w-3xl justify-center gap-2 px-4 sm:p-0">
          {menuLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1 rounded hover:text-amber-700 dark:hover:text-amber-200 transition text-md text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Conteúdo principal (único container responsivo) */}
      <div className="flex flex-col md:flex-row gap-4 min-h-screen">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex md:flex-col md:w-60 xl:w-64">
          <div className="sticky top-24 px-3 flex flex-col space-y-2">
            {menuLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1 hover:text-amber-700 dark:hover:text-amber-500 transition w-full text-left break-words md:border-b"
              >
                {label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 px-4 lg:px-6 flex flex-col gap-6 pt-6 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
