// frontend/components/ui/AccordionItem.tsx
import { ReactNode } from 'react'

type AccordionItemProps = {
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
    <div className="border-1 rounded-md  w-full pb-0">
      {/* Cabeçalho */}
      <div
        className={`w-full p-2 pl-5 pb-2 mb-0 font-semibold flex justify-between items-center hover:bg-gray-100 dark:hover:bg-stone-800 cursor-pointer min-w-0 overflow-hidden ${isOpen ? 'border-b-1' : ''}`}
        onClick={onToggle}
      >
        {/* break-smart usa overflow-wrap e word-break para quebrar palavras longas sem espaços*/}
        <div className="flex-1 break-smart min-w-0 text-sm">{title}</div>
      </div>

      {/* Conteúdo do acordeão */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'px-2 m-3' : 'p-0'
        }`}
      >
        {isOpen && <div className="mt-0 break-smart min-w-0">{children}</div>}
      </div>
    </div>
  )
}
