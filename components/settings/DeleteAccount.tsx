'use client'

import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/context/AuthProvider'

// O componente que mostra o botão para eliminar a conta do utilizador
export default function DeleteAccount() {
  const router = useRouter()
  const { refreshAuth } = useAuth()

  const handleDelete = async () => {
    // Modal de confirmação
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
      // Chamada à API para apagar a conta
      const response = await fetch('/api/settings/delete-account', {
        method: 'POST',
        credentials: 'include', // garante envio do cookie
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erro desconhecido')
      }

      // Sucesso
      await Swal.fire(
        'Conta eliminada!',
        'A tua conta foi removida.',
        'success'
      )

      // 🔹 Atualiza estado de autenticação no cliente
      await refreshAuth()

      // 🔹 Força atualização dos Server Components (navbar, etc.)
      router.refresh()

      // 🔹 Redireciona para homepage
      router.push('/')
    } catch (err) {
      Swal.fire('Erro', (err as Error).message, 'error')
    }
  }

  return <Button text="Eliminar Conta" type="button" onClick={handleDelete} />
}
