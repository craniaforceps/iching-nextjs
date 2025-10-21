'use client'

import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/context/AuthProvider'

export default function DeleteAccount() {
  const router = useRouter()
  const { refreshAuth } = useAuth()

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
    <div className="flex justify-center p-2">
      <Button text="Eliminar Conta" type="button" onClick={handleDelete} />
    </div>
  )
}
