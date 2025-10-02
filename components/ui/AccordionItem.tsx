// frontend/components/ui/AccordionItem.tsx
import { ReactNode } from 'react'

interface AccordionItemProps {
  title: ReactNode
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

export default function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionItemProps) {
  return (
    <div className="border rounded-md shadow-sm">
      {/* Cabeçalho como div, não button */}
      <div
        className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center hover:bg-gray-100 dark:hover:bg-stone-800 cursor-pointer"
        onClick={onToggle}
      >
        {title}
      </div>

      {/* Conteúdo do acordeão */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'p-4' : 'p-0'
        }`}
      >
        {isOpen && <div className="mt-2">{children}</div>}
      </div>
    </div>
  )
}
