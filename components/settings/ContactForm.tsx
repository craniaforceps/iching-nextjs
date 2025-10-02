'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'

// O componente que mostra o formulário para contactar o suporte
export default function ContactForm() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!subject || !message) {
      Swal.fire('Erro', 'Preencha todos os campos!', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/settings/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ subject, message }),
      })

      let data: { success: boolean; error?: string } = { success: false }
      try {
        data = await res.json()
      } catch {
        Swal.fire('Erro', 'Resposta inválida do servidor', 'error')
        return
      }

      if (!res.ok || !data.success) {
        Swal.fire('Erro', data.error || 'Erro desconhecido', 'error')
        return
      }

      Swal.fire('Sucesso', 'Mensagem enviada com sucesso!', 'success')
      setSubject('')
      setMessage('')
    } catch (err) {
      Swal.fire('Erro', (err as Error).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Assunto"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded"
      />
      <Button
        text={loading ? 'A enviar...' : 'Enviar'}
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  )
}
