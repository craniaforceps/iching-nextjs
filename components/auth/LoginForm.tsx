'use client'

import { login } from '@/lib/auth/actions'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
    >
      {pending ? 'A entrar...' : 'Entrar'}
    </button>
  )
}

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, { errors: {} })

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
