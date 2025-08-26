'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { login } from '@/lib/auth/actions'
import { useAuth } from '@/context/AuthProvider'
import type { LoginState } from '@/lib/types/authTypes'
import { SubmitButton } from '../ui/button/SubmitButton'

export default function LoginForm() {
  const [state, loginAction] = useActionState<LoginState, FormData>(login, {
    errors: {},
  })

  const { refreshAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      refreshAuth() // Atualiza o contexto
      router.push('/') // Ou dashboard, etc.
    }
  }, [state, refreshAuth, router])

  return (
    <main className="flex justify-center px-4 pt-16">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">Iniciar Sessão</h1>

        <form action={loginAction} className="space-y-4 w-full">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Palavra-passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {state?.errors?.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
          </div>

          <div className="pt-4">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}
