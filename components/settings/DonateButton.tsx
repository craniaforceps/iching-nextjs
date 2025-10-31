'use client'

import { useState } from 'react'
import Button from '../ui/button/Button'

export default function DonateButton() {
  const [amount, setAmount] = useState(5)

  const handleDonate = async () => {
    const res = await fetch('/api/settings/donation/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Erro ao criar sessão:', res.status, text)
      alert('Erro ao iniciar checkout')
      return
    }

    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-2xl">
      <h2 className="text-lg font-semibold">Paga-me qualquer coisinha</h2>
      <label htmlFor="donation-amount" className="sr-only">
        Valor da doação em euros
      </label>
      <input
        id="donation-amount"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-1 rounded w-24 text-center"
        aria-label="Valor da doação em euros"
      />
      <Button text="Doar" onClick={handleDonate} />
    </div>
  )
}
