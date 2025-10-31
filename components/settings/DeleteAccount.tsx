'use client'

import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/context/AuthProvider'
import { useState } from 'react'
import SettingsField from './SettingsField'

export default function DeleteAccount() {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const [password, setPassword] = useState('')

  const handleDelete = async () => {
    const res = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, eliminar',
      cancelButtonText: 'Cancelar',
    })
    if (!res.isConfirmed) return

    try {
      const response = await fetch('/api/settings/delete-account', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!data.success) {
        Swal.fire('Erro', data.error || 'Erro ao apagar conta', 'error')
        return
      }

      await Swal.fire(
        'Conta eliminada!',
        'A tua conta foi removida permanentemente.',
        'success'
      )
      await refreshAuth()
      router.refresh()
      router.push('/')
    } catch (err: any) {
      Swal.fire('Erro', err.message || 'Erro ao apagar conta', 'error')
    }
  }

  return (
    <div className="flex flex-col items-center p-2 gap-3">
      <SettingsField
        name="confirmPassword"
        type="password"
        placeholder="Confirmar nova password"
        required
      />

      <Button
        text="Eliminar Conta"
        type="button"
        onClick={handleDelete}
        disabled={password.length < 6}
      />
      <p className="text-xs text-gray-500">
        É necessário confirmar com a tua password atual (mínimo 6 caracteres).
      </p>
    </div>
  )
}
