'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { loginUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthProvider'
import type { LoginState } from '@/lib/auth/types'
import { SubmitButton } from '../ui/button/SubmitButton'
import FormContainer from './FormContainer'
import FormField from './FormField'
import { useAuthFeedback } from '@/hooks/useAuthFeedback'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginForm() {
  const [state, loginAction] = useActionState<LoginState, FormData>(loginUser, {
    errors: {},
    success: false,
  })
  const { refreshAuth } = useAuth()
  const router = useRouter()

  useAuthFeedback(
    state,
    'Sessão iniciada com sucesso!',
    '/dashboard',
    refreshAuth,
    router
  )

  useEffect(() => {
    if (!state.success) return

    const redirect = () => router.push('/dashboard')
    const savedReading = localStorage.getItem('guestReading')

    if (!savedReading) {
      redirect()
      return
    }

    const readingData = JSON.parse(savedReading)

    fetch('/api/readings/restore-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(readingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success)
          console.error('Erro ao restaurar leitura', data.error)
        else localStorage.removeItem('guestReading')
      })
      .catch((err) => console.error('Erro ao restaurar leitura', err))
      .finally(() => redirect())
  }, [state.success, router])

  return (
    <main className="flex justify-center px-4 pt-16 flex-col">
      <FormContainer title="O que fazes aí fora?">
        <form action={loginAction} className="space-y-4 w-full">
          <div className="flex mx-auto justify-center flex-col">
            <div className="relative w-full max-w-md aspect-6/5 overflow-hidden rounded-lg">
              {/* Imagem de fundo */}
              <Image
                src="/images/svg/group.svg"
                alt="Descrição da imagem"
                fill
                className="object-cover object-[10%_70%] transition duration-300 dark:invert"
                priority
              />

              {/* Texto sobre a imagem */}
              {/* <div className="absolute top-8 left-16 flex items-center justify-center bg-transparent text-3xl  font-bold">
                    Leituras
                  </div> */}
            </div>
            <p className="p-primary text-center text-base tracking-wide leading-relaxed">
              Não sabes quem somos? <br></br>Vai até{' '}
              <Link href="/registo">
                <u>ali</u>
              </Link>
              .
            </p>
          </div>
          <FormField
            id="email"
            label="Email"
            required
            placeholder="user@email.com"
            errors={state.errors?.email ?? []}
          />
          <FormField
            id="password"
            label="Palavra-passe"
            type="password"
            required
            placeholder="Mínimo 6 caracteres"
            errors={state.errors?.password ?? []}
          />
          <div className="pt-4">
            <SubmitButton title="Entrar" />
          </div>
        </form>
      </FormContainer>
    </main>
  )
}
