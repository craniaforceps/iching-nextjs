'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type GuestSaveModalProps = {
  isOpen: boolean
  onClose: () => void
  readingData: any
}

export default function GuestSaveModal({
  isOpen,
  onClose,
  readingData,
}: GuestSaveModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleLogin = () => {
    localStorage.setItem('guestReading', JSON.stringify(readingData))
    onClose()
    router.push('/login')
  }

  const handleRegister = () => {
    localStorage.setItem('guestReading', JSON.stringify(readingData))
    onClose()
    router.push('/registo')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Guardar Leitura</h2>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          Para guardar esta leitura, precisa de fazer login ou criar uma conta.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Registo
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
