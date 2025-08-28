'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HexagramReferenceTable from '@/components/features/tables/HexagramReferenceTable'
import HexagramListTable from '@/components/features/tables/HexagramListTable'
import Title from '@/components/ui/Title'

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

const TabelasPage = () => {
  const [open, setOpen] = useState<string>('')

  return (
    <>
      <Title title="Tabelas" />

      {/* <div className="flex justify-center">
        <div className="prose dark:prose-invert max-w-[50rem] mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, iure
          laudantium. Eos sapiente impedit ipsa illo tenetur ipsum expedita
          aspernatur unde qui omnis modi, corrupti quaerat aperiam, error
          quisquam totam!
        </div>
      </div> */}

      {/* Container centralizado para acordeão */}
      <div className="flex justify-center">
        <div className="w-full max-w-[55rem] space-y-4 ">
          {TABLES.map(({ key, title, component }) => (
            <div key={key} className="border rounded-lg overflow-hidden ">
              {/* Botão do acordeão */}
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold  transition hover:text-amber-500 cursor-pointer"
                onClick={() => setOpen(open === key ? '' : key)}
              >
                {title}
              </button>

              {/* Conteúdo com animação */}
              <AnimatePresence initial={false}>
                {open === key && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden min-h-[300px]" // <--- Altura mínima fixa
                  >
                    <div className="p-4">{component}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TabelasPage
