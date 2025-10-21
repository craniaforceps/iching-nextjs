'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { AuthContextType, SafeUser } from '@/lib/auth/types'
import { getCurrentUser } from '@/lib/auth/session'

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  refreshAuth: async () => {},
})

type AuthProviderProps = {
  children: React.ReactNode
  initialUser?: SafeUser | null
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] = useState<SafeUser | null>(initialUser)
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser)
  const [loading, setLoading] = useState(!initialUser)

  const refreshAuth = async () => {
    setLoading(true)
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (err) {
      console.error('Erro ao obter utilizador:', err)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) refreshAuth()
  }, [])

  // Memoiza o contexto para evitar re-renders desnecessários
  const contextValue = useMemo(
    () => ({ isAuthenticated, user, loading, refreshAuth }),
    [isAuthenticated, user, loading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
