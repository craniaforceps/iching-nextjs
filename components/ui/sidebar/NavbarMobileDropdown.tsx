'use client'

import { usePathname } from 'next/navigation'

type NavbarMobileDropdownProps = {
  links: { href: string; label: string }[]
}

export default function NavbarMobileDropdown({
  links,
}: NavbarMobileDropdownProps) {
  const pathname = usePathname()

  return (
    <nav className="flex w-full justify-center shadow-md py-2 sticky top-[60px] z-10 bg-white dark:bg-stone-900 md:hidden">
      <div className="flex min-w-xs w-full justify-center gap-2 px-4 sm:p-0">
        <label htmlFor="tab-select" className="sr-only">
          Selecionar separador
        </label>
        <select
          id="tab-select"
          className="w-full max-w-xl p-2 border rounded text-center dark:bg-stone-900 dark:text-gray-200"
          value={pathname}
          onChange={(e) => (window.location.href = e.target.value)}
        >
          {links.map((link) => (
            <option key={link.href} value={link.href}>
              {link.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  )
}
