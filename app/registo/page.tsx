'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      toast.success('Conta criada com sucesso!')
      window.location.href = '/login'
    } else {
      const { error } = await res.json()
      toast.error(error || 'Erro ao criar conta.')
    }
  }

  return (
    <main className="flex justify-center px-4 pt-16">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">Criar Conta</h1>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              title="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Palavra-passe
            </label>
            <input
              title="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition"
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
