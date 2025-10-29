'use client'

import { ReactNode, forwardRef } from 'react'

type AccordionItemProps = {
  title: ReactNode
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

// ✅ NÃO incluas "ref" aqui — o forwardRef já o injeta automaticamente
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, isOpen, onToggle, children }, ref) => {
    return (
      <div ref={ref} className="border rounded-md w-full pb-0">
        {/* Cabeçalho */}
        <div
          className={`w-full p-2 mb-0 font-semibold flex justify-between items-center hover:bg-gray-300 dark:hover:bg-stone-800 cursor-pointer min-w-0 overflow-hidden text-center ${
            isOpen ? 'border-b' : ''
          }`}
          onClick={onToggle}
        >
          <div className="flex-1 break-smart min-w-0 text-sm">{title}</div>
        </div>

        {/* Conteúdo */}
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
)

AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
