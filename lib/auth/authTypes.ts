// === Auth / Users ===

export type User = {
  id: number
  email: string
  password: string
  createdAt: string
}

export type SafeUser = {
  id: number
  email: string
}

export type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  success?: boolean
  userId?: number
}

export type RegisterData = {
  email: string
  password: string
}

export type RegisterState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  success?: boolean
  userId?: number
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: SafeUser | null
  loading: boolean
  refreshAuth: () => void
}
