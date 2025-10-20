// NavItemRenderer.tsx
'use client'
import Link from 'next/link'
import { NavItem } from './types'
import { usePathname } from 'next/navigation'

export default function NavItemRenderer({
  item,
  onLinkClick,
}: {
  item: NavItem
  onLinkClick?: () => void
}) {
  const pathname = usePathname()

  if (item.type === 'link') {
    const isActive =
      pathname === item.href ||
      (item.href !== '/' && pathname.startsWith(item.href))

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onLinkClick}
        className={`transition tracking-wide cursor-pointer text-md lg:text-lg xl:text-xl 2xl:text-xl ${
          isActive
            ? 'text-amber-500 font-semibold'
            : 'hover:text-amber-500 text-stone-900 dark:text-gray-200'
        }`}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <button
      key={item.label}
      onClick={item.onClick}
      className="hover:text-red-500 transition cursor-pointer text-left text-md lg:text-lg xl:text-xl 2xl:text-xl"
    >
      {item.label}
    </button>
  )
}
