'use client'

import { useState } from 'react'
import AccordionItem from '../ui/AccordionItem'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import ContactForm from './ContactForm'
import DeleteAccount from './DeleteAccount'
import Link from 'next/link'
import Image from 'next/image'

export default function Donation() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  return (
    <section className="main-dashboard">
      <h2 className="h2-title">Tem dois euros que me empreste?</h2>

      <div className="flex md:flex-row flex-col justify-center">
        <div className="space-y-6 justify-text p-2">
          <div className=" mx-auto">
            <Image
              src="/images/svg/fish-guy.png"
              alt="Figura ilustrativa de um ancião"
              width={300}
              height={635}
              className="w-full h-auto object-contain transition-transform duration-300 dark:invert"
              priority
            />
          </div>
          {/* <div>
            <p className="p-primary md:pl-5 text-sm">
              Sugiro que comeces por seguir as nossas instruções. Estas são
              apenas algumas das funcionalidades que temos para ti.
            </p>
          </div> */}
          <div>
            <p className="p-primary text-center">Por implementar</p>
          </div>
        </div>
      </div>
    </section>
  )
}
