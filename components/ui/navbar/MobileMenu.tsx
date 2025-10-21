import NavbarLinks from './NavbarLinks'

type MobileMenuProps = {
  isOpen: boolean
  closeMenu: () => void
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <nav className="absolute top-full left-0 w-full bg-white dark:bg-stone-900 shadow-md md:hidden z-[999]">
      <div className="flex flex-col p-4 gap-2">
        <NavbarLinks onLinkClick={closeMenu} />
      </div>
    </nav>
  )
}
