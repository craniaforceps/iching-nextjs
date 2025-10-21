'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { registerUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthProvider'
import { SubmitButton } from '../ui/button/SubmitButton'
import FormContainer from './FormContainer'
import FormField from './FormField'
import type { RegisterState } from '@/lib/auth/types'
import { useAuthFeedback } from '@/hooks/useAuthFeedback'

// Formulário de registo - criação de uma nova conta com email e password
export default function RegisterForm() {
  const { refreshAuth } = useAuth()
  const router = useRouter()
  const [state, registerAction] = useActionState<RegisterState, FormData>(
    registerUser,
    { errors: {}, success: false }
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

  // useCallback evita recriar funções em cada render
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
      <FormContainer title="Criar Conta">
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
            <SubmitButton />
          </div>
        </form>
      </FormContainer>
    </main>
  )
}
