'use client'

import Button from '@/components/ui/button/Button'
import { useState } from 'react'
import Swal from 'sweetalert2'

type Props = {
  userId: number
  emailVerified?: boolean
}

export default function SendVerificationButton({
  userId,
  emailVerified,
}: Props) {
  const [sent, setSent] = useState(emailVerified || false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const res = await fetch('/api/settings/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) {
        Swal.fire('Erro', data.error || 'Erro ao enviar email', 'error')
      } else {
        Swal.fire(
          'Verificação enviada!',
          'Verifica o teu email e clica no link para confirmar a tua conta.',
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
        text={
          sent ? 'Email de verificação enviado' : 'Enviar email de verificação'
        }
        type="button"
        onClick={handleClick}
        disabled={sent || loading}
      />
    </div>
  )
}
