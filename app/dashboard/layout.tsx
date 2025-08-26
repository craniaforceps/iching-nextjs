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
    <div className="grid grid-cols-1 md:grid-cols-4 md:h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <aside className="md:col-span-1 w-full shadow-md p-4 flex md:block justify-center bg-white dark:bg-gray-800 transition-colors encurtar-no-mobile">
        <div className="w-full">
          {' '}
          {/* <-- Garantir que ocupa toda a coluna */}
          <nav className="flex md:flex-col justify-center items-center space-y-2">
            {menuLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1 rounded hover:bg-amber-100 dark:hover:bg-amber-700 hover:text-amber-700 dark:hover:text-amber-200 transition w-full text-center md:text-left"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Conteúdo das páginas */}
      <main className="md:col-span-3 w-full max-w-4xl mx-auto p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
