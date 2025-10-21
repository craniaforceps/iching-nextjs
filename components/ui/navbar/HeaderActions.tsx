import DarkModeToggle from '@/components/ui/button/DarkModeButton'
import MobileMenuButton from './MobileMenuButton'

type HeaderActionsProps = {
  menuOpen: boolean
  toggleMenu: () => void
}

export default function HeaderActions({
  menuOpen,
  toggleMenu,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <DarkModeToggle />
      <MobileMenuButton isOpen={menuOpen} onClick={toggleMenu} />
    </div>
  )
}
