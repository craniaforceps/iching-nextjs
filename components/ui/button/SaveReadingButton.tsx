'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'

export default function SaveReadingButton({ onSave }: { onSave: () => void }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser()
      setUser(u)
    }
    fetchUser()
  }, [])

  const handleClick = async () => {
    if (!user) {
      // Garante que leitura guest está no localStorage
      onSave()

      const res = await Swal.fire({
        title: 'A tua sessão não está iniciada',
        text: 'Para guardar a leitura precisas de criar conta ou fazer login.',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Registo',
        denyButtonText: 'Login',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'gray', // cinzento
        denyButtonColor: 'gray', // cinzento
        cancelButtonColor: '#DC2626', // vermelho
      })

      if (res.isConfirmed) router.push('/registo')
      else if (res.isDenied) router.push('/login')
      return
    }

    // User logado: salva direto na BD
    onSave()
  }

  return <Button text="Guardar" type="button" onClick={handleClick} />
}
