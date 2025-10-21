'use client'

import Link from 'next/link'

type NavbarMobileProps = {
  links: { href: string; label: string }[]
  activePath: string
}

// Para mobile
export default function NavbarMobile({ links, activePath }: NavbarMobileProps) {
  return (
    <nav className="flex w-full justify-center shadow-md py-2 sticky top-[60px] z-10 bg-white dark:bg-stone-900 md:hidden">
      <div className="flex w-full max-w-3xl justify-center gap-2 px-4 sm:p-0">
        {links.map(({ href, label }) => {
          // Selecionar separador
          const isActive = activePath.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-1 py-1 rounded transition text-md text-center ${
                isActive
                  ? 'text-amber-500 font-semibold'
                  : 'hover:text-amber-500'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
