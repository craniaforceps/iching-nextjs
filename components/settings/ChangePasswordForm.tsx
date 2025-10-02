'use client'

import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'

// O componente que mostra o formulário para mudar a password do utilizador
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire('Erro', 'As passwords não coincidem!', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/settings/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao mudar password')
      }

      Swal.fire('Sucesso', 'Password atualizada com sucesso!', 'success')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      Swal.fire('Erro', (err as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="password"
        placeholder="Password atual"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Nova password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Confirmar nova password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <Button
        text={loading ? 'A atualizar...' : 'Guardar'}
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  )
}
