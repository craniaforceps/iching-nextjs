'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'

export default function LogoutPage() {
  const router = useRouter()
  const { refreshAuth } = useAuth()

  useEffect(() => {
    const doLogout = async () => {
      await fetch('/api/auth/logout', { method: 'POST' })
      refreshAuth()
      router.push('/')
    }

    doLogout()
  }, [refreshAuth, router])

  // 🔧 O erro acontecia porque não havia JSX aqui
  return <p className="text-center mt-10">A terminar sessão...</p>
}
