import Link from 'next/link'

type SidebarProps = {
  links: { href: string; label: string }[]
  activePath: string
}

export default function Sidebar({ links, activePath }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:flex-col md:w-60 xl:w-64">
      <div className="sticky top-30 px-3 flex flex-col space-y-2">
        {links.map((link) => {
          const isActive =
            link.href === '/dashboard/'
              ? activePath === '/dashboard/'
              : activePath.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 w-full text-left break-words md:border-b transition-colors duration-150 ${
                isActive
                  ? 'text-amber-500 font-semibold'
                  : 'hover:text-amber-500'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
