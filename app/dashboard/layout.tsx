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
      {/* Navbar horizontal para mobile com sticky */}
      <nav className="flex w-full justify-center shadow-md py-2 mb-4 mt-20 md:hidden sticky top-0 z-10 bg-white dark:bg-stone-900">
        <div className="flex w-full max-w-3xl justify-center md:gap-4 gap-2 px-4 sm:p-0">
          {menuLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-0 my-0 rounded hover:text-amber-700 dark:hover:text-amber-200 transition text-md text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Layout desktop / tablet */}
      <div className="hidden md:flex gap-4 h-screen">
        {/* Sidebar */}
        <aside className="md:w-60 xl:w-64 flex flex-col">
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

        {/* Conteúdo com scroll independente */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 flex flex-col mt-5">
          {children}
        </div>
      </div>

      {/* Mobile content */}
      <div className="md:hidden mt-4">{children}</div>
    </div>
  )
}
