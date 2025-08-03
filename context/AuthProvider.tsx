'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  refreshAuth: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  refreshAuth: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'include' })
      setIsAuthenticated(res.ok)
    } catch (err) {
      console.log(err)
      // Silencia o erro, pois 401 é normal quando não autenticado
      setIsAuthenticated(false)
    }
  }

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
