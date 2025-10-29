'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
HexagramListTable
import HexagramListTable from './HexagramListTable'
import HexagramReferenceTable from './HexagramReferenceTable'

const TABLES = [
  {
    key: 'sequencial',
    title: 'Tabela Sequencial',
    component: <HexagramListTable />,
  },
  {
    key: 'referencia',
    title: 'Tabela de Referência com Trigramas',
    component: <HexagramReferenceTable />,
  },
]

export default function Tables() {
  const [open, setOpen] = useState<string>('')

  return (
    <div className="w-full max-w-4xl flex-col flex space-y-4 px-5 lg:px-0">
      {TABLES.map(({ key, title, component }) => (
        <div key={key} className="border rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full text-left px-4 py-3 font-semibold transition hover:text-amber-500 cursor-pointer"
            onClick={() => setOpen(open === key ? '' : key)}
          >
            {title}
          </button>

          <AnimatePresence initial={false}>
            {open === key && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="overflow-hidden min-h-[300px]"
              >
                <div className="p-4">{component}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
