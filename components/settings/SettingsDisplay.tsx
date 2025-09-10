'use client'

import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'
import DeleteAccount from './DeleteAccount'

export default function SettingsDisplay() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4">
      {/* Alterar Password */}
      <AccordionItem
        title="Alterar Password"
        isOpen={open === 'password'}
        onToggle={() => toggle('password')}
      >
        <ChangePasswordForm />
      </AccordionItem>

      {/* Alterar Email */}
      <AccordionItem
        title="Alterar Email"
        isOpen={open === 'email'}
        onToggle={() => toggle('email')}
      >
        <ChangeEmailForm />
      </AccordionItem>

      {/* Eliminar Conta */}
      <AccordionItem
        title="Eliminar Conta"
        isOpen={open === 'delete'}
        onToggle={() => toggle('delete')}
      >
        <DeleteAccount />
      </AccordionItem>

      {/* Formulário de Contacto */}
      <AccordionItem
        title="Formulário de Contacto"
        isOpen={open === 'contact'}
        onToggle={() => toggle('contact')}
      >
        <ContactForm />
      </AccordionItem>
    </div>
  )
}

/* --- Reusable Accordion Item --- */
function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border rounded-md shadow-sm">
      <button
        className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center hover:bg-gray-100 dark:hover:bg-stone-800 cursor-pointer"
        onClick={onToggle}
      >
        {title}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen p-4' : 'max-h-0 p-0'
        }`}
      >
        {isOpen && <div className="mt-2">{children}</div>}
      </div>
    </div>
  )
}

/* --- Forms simples --- */
function ChangePasswordForm() {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="password"
        placeholder="Password atual"
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Nova password"
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Confirmar password"
        className="border p-2 rounded"
      />
      <Button
        text="Guardar"
        type="button"
        onClick={() => Swal.fire('Sucesso!')}
      />
    </div>
  )
}

function ChangeEmailForm() {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Novo email"
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password atual"
        className="border p-2 rounded"
      />
      <Button
        text="Atualizar Email"
        type="button"
        onClick={() => Swal.fire('Email atualizado!')}
      />
    </div>
  )
}

function ContactForm() {
  return (
    <div className="flex flex-col gap-2">
      <input type="text" placeholder="Assunto" className="border p-2 rounded" />
      <textarea placeholder="Mensagem" className="border p-2 rounded" />
      <Button
        text="Enviar"
        type="button"
        onClick={() => Swal.fire('Mensagem enviada!')}
      />
    </div>
  )
}
