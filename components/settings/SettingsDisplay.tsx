'use client'

import { useState, useEffect, useRef } from 'react'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'
import DeleteAccount from './DeleteAccount'
import Donation from './Donation'
import Image from 'next/image'

export default function SettingsDisplay() {
  const [open, setOpen] = useState<string | null>(null)

  // refs de cada acordeão
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  // Scroll automático quando o acordeão abre
  useEffect(() => {
    if (open && sectionRefs.current[open]) {
      const el = sectionRefs.current[open]
      if (!el) return

      const headerOffset = 80 // altura do header sticky
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [open])

  return (
    <>
      {/* imagem decorativa */}
      <div className="relative w-full -top-3 h-100 lg:h-[350px]">
        <Image
          src="/images/svg/lady.svg"
          alt="Descrição da imagem"
          fill
          className="object-contain w-full h-full p-0 hover:scale-105 transform dark:invert"
        />
      </div>

      {/* acordeões */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 lg:w-2/3 w-full">
        <AccordionItem
          ref={(el) => {
            sectionRefs.current['password'] = el
          }}
          title="Alterar Password"
          isOpen={open === 'password'}
          onToggle={() => toggle('password')}
        >
          <ChangePasswordForm />
        </AccordionItem>

        <AccordionItem
          ref={(el) => {
            sectionRefs.current['email'] = el
          }}
          title="Alterar Email"
          isOpen={open === 'email'}
          onToggle={() => toggle('email')}
        >
          <ChangeEmailForm />
        </AccordionItem>

        <AccordionItem
          ref={(el) => {
            sectionRefs.current['delete'] = el
          }}
          title="Eliminar Conta"
          isOpen={open === 'delete'}
          onToggle={() => toggle('delete')}
        >
          <DeleteAccount />
        </AccordionItem>

        <AccordionItem
          ref={(el) => {
            sectionRefs.current['password'] = el
          }}
          title="Formulário de Contacto"
          isOpen={open === 'contact'}
          onToggle={() => toggle('contact')}
        >
          <ContactForm />
        </AccordionItem>

        <AccordionItem
          ref={(el) => {
            sectionRefs.current['donation'] = el
          }}
          title="Donação"
          isOpen={open === 'donation'}
          onToggle={() => toggle('donation')}
        >
          <Donation />
        </AccordionItem>
      </div>
    </>
  )
}
