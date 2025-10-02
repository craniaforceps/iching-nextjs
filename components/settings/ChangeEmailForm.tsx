'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/context/AuthProvider'

// O componente que mostra o formulário para mudar o email do utilizador
export default function ChangeEmailForm() {
  const { refreshAuth } = useAuth()
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!newEmail || !confirmEmail || !password) {
      Swal.fire('Erro', 'Preencha todos os campos!', 'error')
      return
    }

    if (newEmail !== confirmEmail) {
      Swal.fire('Erro', 'Os emails não coincidem!', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/settings/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newEmail, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao atualizar email')
      }

      Swal.fire('Sucesso', 'Email atualizado com sucesso!', 'success')

      // Atualiza o estado global (navbar, etc.)
      await refreshAuth()

      setNewEmail('')
      setConfirmEmail('')
      setPassword('')
    } catch (err) {
      Swal.fire('Erro', (err as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Novo email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Confirmar novo email"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password atual"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <Button
        text={loading ? 'A atualizar...' : 'Atualizar Email'}
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  )
}
