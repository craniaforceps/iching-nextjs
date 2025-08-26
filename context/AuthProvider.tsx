// considerar guardar id, name, email dos users para além do isAuthenticated

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthContextType } from '@/lib/types/authTypes'

// Criar o contexto global que gere a autenticação

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false, // guarda o state de autenticação
  refreshAuth: () => {}, // é igual ao checkAuth - verifica se o user está logado
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = async () => {
    try {
      // Usa o /api/me para saber se o utilizador está autenticado e atualiza o estado
      const res = await fetch('/api/me', { credentials: 'include' })
      setIsAuthenticated(res.ok)
    } catch (err) {
      console.log(err)
      // Silencia o erro, pois 401 é normal quando não autenticado
      setIsAuthenticated(false)
    }
  }

  // Garante que o checkAuth é sempre passado aquando do primeiro render (mount inicial)
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
