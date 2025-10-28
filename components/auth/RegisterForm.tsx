'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { registerUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthProvider'
import { SubmitButton } from '../ui/button/SubmitButton'
import FormContainer from './FormContainer'
import FormField from './FormField'
import type { RegisterState } from '@/lib/auth/types'
import { useAuthFeedback } from '@/hooks/useAuthFeedback'
import Image from 'next/image'

export default function RegisterForm() {
  const { refreshAuth } = useAuth()
  const router = useRouter()
  const [state, registerAction] = useActionState<RegisterState, FormData>(
    registerUser,
    {
      errors: {},
      success: false,
    }
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useAuthFeedback(
    state,
    'Conta criada com sucesso! Bem-vindo(a)!',
    '/dashboard',
    refreshAuth,
    router
  )

  useEffect(() => {
    if (!state.success) return

    const restoreAndRedirect = async () => {
      // Primeiro, refresh da sessão
      await refreshAuth()

      const savedReading = localStorage.getItem('guestReading')
      if (savedReading) {
        try {
          const readingData = JSON.parse(savedReading)
          const res = await fetch('/api/readings/restore-reading', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readingData),
          })
          const data = await res.json()
          if (!data.success)
            console.error('Erro ao restaurar leitura', data.error)
          else localStorage.removeItem('guestReading')
        } catch (err) {
          console.error('Erro ao restaurar leitura', err)
        }
      }

      router.push('/dashboard')
    }

    restoreAndRedirect()
  }, [state.success, refreshAuth, router])

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  )
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  )

  return (
    <main className="flex justify-center px-4 pt-16">
      <FormContainer title="Junta-te a nós">
        {' '}
        <div className="flex mx-auto justify-center">
          <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg">
            {/* Imagem de fundo */}
            <Image
              src="/images/svg/women.svg"
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
        </div>
        <form action={registerAction} className="space-y-4 w-full">
          <FormField
            id="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="user@email.com"
            errors={state.errors?.email ?? []}
          />
          <FormField
            id="password"
            label="Palavra-passe"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Mínimo 6 caracteres"
            errors={state.errors?.password ?? []}
          />
          <div className="pt-4">
            <SubmitButton title="Registar" />
          </div>
        </form>
      </FormContainer>
    </main>
  )
}
