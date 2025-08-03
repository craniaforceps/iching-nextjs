'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

export default function LogoutButton() {
  const router = useRouter()
  const { refreshAuth } = useAuth()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    refreshAuth()
    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 font-medium transition"
    >
      Terminar sessão
    </button>
  )
}
