'use client'

import { useState, useEffect, useRef } from 'react'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'
import DeleteAccount from './DeleteAccount'
import Donation from './Donation'
import Image from 'next/image'
import ChangeNameForm from './ChangeNameForm'
import SendWelcomeButton from './SendWelcomeButton'
import { useAuth } from '@/context/AuthProvider'
import { Check, X } from 'lucide-react'
import ResendVerificationButton from './ResendVerificationButton'

export default function SettingsDisplay() {
  const [open, setOpen] = useState<string | null>(null)
  const { user } = useAuth()
  const userId = user?.id
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
          src="/images/svg/lady-png.svg"
          alt="Imagem decorativa"
          fill
          className="object-contain w-full h-full p-0 hover:scale-105 transform dark:invert"
          priority
        />
      </div>

      {/* Perfil */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-3 lg:w-2/3 w-full">
        <h3 className="h3-title pl-2">Informações pessoais</h3>
        <div className="border shadow rounded-md p-4 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 items-center text-sm">
            {/* Nome */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Nome
              </span>
              <span className="text-gray-900 dark:text-gray-100 truncate">
                {user?.name}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Email
              </span>
              <span className="text-gray-900 dark:text-gray-100 truncate hover:overflow-visible hover:whitespace-normal">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Estado da verificação */}
          <div className="mt-2 flex flex-col  gap-2 text-sm">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 justify-between">
              <div className="flex gap-1 items-center ">
                {user?.emailVerified ? (
                  <>
                    <Check className="text-green-500 w-4 h-4" />
                    <span>Verificado</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-500 w-4 h-4" />
                    <span>Pendente</span>
                  </>
                )}
              </div>
              <div>
                {/* Botão de reenviar email */}
                {userId && !user.emailVerified && (
                  <ResendVerificationButton
                    userId={userId}
                    emailVerified={user.emailVerified}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-bottom">
          <h3 className="h3-title pl-2">Mudanças</h3>
          <AccordionItem
            ref={(el) => {
              sectionRefs.current['name'] = el
            }}
            title="Alterar Nome"
            isOpen={open === 'name'}
            onToggle={() => toggle('name')}
          >
            <ChangeNameForm />
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
              sectionRefs.current['password'] = el
            }}
            title="Alterar Password"
            isOpen={open === 'password'}
            onToggle={() => toggle('password')}
          >
            <ChangePasswordForm />
          </AccordionItem>
        </div>

        <div className="flex flex-col gap-2 border-bottom">
          <h3 className="h3-title pl-2">Fala comigo</h3>

          <AccordionItem
            ref={(el) => {
              sectionRefs.current['contact'] = el
            }}
            title="Formulário de Contacto"
            isOpen={open === 'contact'}
            onToggle={() => toggle('contact')}
          >
            <ContactForm />
          </AccordionItem>
        </div>
        <div className="flex flex-col gap-2 border-bottom">
          <h3 className="h3-title pl-2">Ajuda</h3>{' '}
          <AccordionItem
            ref={(el) => {
              sectionRefs.current['donation'] = el
            }}
            title="Doação"
            isOpen={open === 'donation'}
            onToggle={() => toggle('donation')}
          >
            <Donation />
          </AccordionItem>
        </div>
        <div className="flex flex-col gap-2 border-bottom">
          <h3 className="h3-title pl-2">Apagar</h3>
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
        </div>

        {/* {userId && (
          <SendWelcomeButton
            userId={userId}
            alreadySent={user.welcomeEmailSent}
          />
        )} */}
      </div>
    </>
  )
}
