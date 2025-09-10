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
  success?: boolean
  userId?: number
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: User | null // <--- adiciona isto
  loading: boolean // <--- adiciona isto
  refreshAuth: () => void
}

export type RegisterData = {
  email: string
  password: string
}

export type SuccessResponse<T> = {
  success: true
  data: T
}

export type ErrorResponse = {
  success: false
  error: unknown
}
