'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { loginUser } from '@/lib/auth/authServices'
import { useAuth } from '@/context/AuthProvider'
import type { LoginState } from '@/lib/auth/types'
import { SubmitButton } from '../ui/button/SubmitButton'
import FormContainer from './FormContainer'
import FormField from './FormField'
import { useLoginFeedback } from '@/hooks/useLoginFeedback'

export default function LoginForm() {
  const [state, loginAction] = useActionState<LoginState, FormData>(loginUser, {
    errors: {},
    success: false,
  })
  const { refreshAuth } = useAuth()
  const router = useRouter()

  useLoginFeedback(state, refreshAuth, router)

  return (
    <main className="flex justify-center px-4 pt-16">
      <FormContainer title="Iniciar Sessão">
        <form action={loginAction} className="space-y-4 w-full">
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
            <SubmitButton />
          </div>
        </form>
      </FormContainer>
    </main>
  )
}
