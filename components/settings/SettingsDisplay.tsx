'use client'

import { useState } from 'react'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'
import DeleteAccount from './DeleteAccount'
import Link from 'next/link'
import Image from 'next/image'

export default function SettingsDisplay() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 items- lg:w-2/3 w-5/6">
      <div>
        <Link href="/pagina-interna">
          <div className="block w-32 h-32 relative overflow-hidden rounded-lg">
            {/* Imagem de fundo */}
            <Image
              src="/images/orange_bagua.png" // caminho da imagem
              alt="Descrição da imagem"
              fill // faz a imagem preencher o container
              style={{ objectFit: 'cover' }} // mantém proporção e cobre o quadrado
            />

            {/* Texto sobre a imagem */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-base font-bold">
              Texto em cima
            </div>
          </div>
        </Link>
      </div>

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
