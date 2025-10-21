import { Menu, X } from 'lucide-react'

type MobileMenuButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 hover:scale-105 dark:hover:text-amber-500 hover:text-amber-500 cursor-pointer"
      onClick={onClick}
      aria-label="Abrir menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}
