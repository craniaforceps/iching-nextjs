'use client'

import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'
import DeleteAccount from './DeleteAccount'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'

// O componente que mostra a página de definições com formulários para mudar password, email, eliminar conta e contactar suporte
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

/* --- Forms simples --- */
