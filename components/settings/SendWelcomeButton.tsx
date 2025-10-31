'use client'

import Button from '@/components/ui/button/Button'
import { useState } from 'react'
import Swal from 'sweetalert2'

type Props = {
  userId: number
  alreadySent?: boolean
}

export default function SendWelcomeButton({ userId, alreadySent }: Props) {
  const [sent, setSent] = useState(alreadySent || false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const res = await fetch('/api/settings/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) {
        Swal.fire('Erro', data.error || 'Erro ao enviar email', 'error')
      } else {
        Swal.fire(
          'Email enviado!',
          'Verifica a tua caixa de entrada.',
          'success'
        )
        setSent(true)
      }
    } catch (err: any) {
      Swal.fire('Erro', err.message || 'Erro ao enviar email', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center mt-4">
      <Button
        text={sent ? 'Email enviado' : 'Receber email de boas-vindas'}
        type="button"
        onClick={handleClick}
        disabled={sent || loading}
      />
    </div>
  )
}
