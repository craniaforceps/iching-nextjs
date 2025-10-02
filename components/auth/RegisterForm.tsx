'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { registerUser } from '@/lib/auth/actions'
import { useAuth } from '@/context/AuthProvider'
import { SubmitButton } from '../ui/button/SubmitButton'

export default function RegisterForm() {
  const router = useRouter()
  const { refreshAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string[]
    password?: string[]
  }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        toast.success('Conta criada com sucesso! Bem-vindo(a)!')
        refreshAuth() // atualiza contexto com login automático
        router.push('/dashboard')
        return
      }

      setErrors(result.errors)
      const allErrors = [
        ...(result.errors.email ?? []),
        ...(result.errors.password ?? []),
      ]
      if (allErrors.length) toast.error(allErrors.join(' • '))
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar conta.')
    }
  }

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Criar Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="Email do utilizador"
            placeholder="Ex: user@email.com"
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {errors.email?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Palavra-passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            title="Palavra-passe do utilizador"
            placeholder="Mínimo 6 caracteres"
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {errors.password?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
