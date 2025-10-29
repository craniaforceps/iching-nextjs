import DarkModeToggle from '@/components/ui/button/DarkModeButton'
import MobileMenuButton from './MobileMenuButton'
import { useAuth } from '@/context/AuthProvider'
import Name from './Name'

type HeaderActionsProps = {
  menuOpen: boolean
  toggleMenu: () => void
}

export default function HeaderActions({
  menuOpen,
  toggleMenu,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4 ">
      <DarkModeToggle />
      <Name />
      <MobileMenuButton isOpen={menuOpen} onClick={toggleMenu} />
    </div>
  )
}
