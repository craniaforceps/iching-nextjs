'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

// O componente que mostra o botão para alternar entre modo claro e escuro
export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Evita renderização inconsistente entre SSR e cliente

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded flex items-center gap-2"
      aria-label="Toggle dark mode"
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 hover:scale-105  dark:hover:border-amber-500 dark:hover:text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 hover:scale-105  dark:hover:border-amber-500 dark:hover:text-amber-500" />
      )}
    </button>
  )
}
