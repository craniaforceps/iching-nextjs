export type User = {
  id: number
  email: string
  password: string
  createdAt: string
}

export type LoginState = {
  errors: {
    email?: string[]
    password?: string[]
  }
  success?: boolean // 👈 ADICIONA ISTO
}

export type AuthContextType = {
  isAuthenticated: boolean
  refreshAuth: () => void
}
