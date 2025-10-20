'use client'

import { useState } from 'react'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'
import DeleteAccount from './DeleteAccount'

export default function SettingsDisplay() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4 items-center">
      <AccordionItem
        title="Alterar Password"
        isOpen={open === 'password'}
        onToggle={() => toggle('password')}
      >
        <ChangePasswordForm />
      </AccordionItem>

      <AccordionItem
        title="Alterar Email"
        isOpen={open === 'email'}
        onToggle={() => toggle('email')}
      >
        <ChangeEmailForm />
      </AccordionItem>

      <AccordionItem
        title="Eliminar Conta"
        isOpen={open === 'delete'}
        onToggle={() => toggle('delete')}
      >
        <DeleteAccount />
      </AccordionItem>

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
