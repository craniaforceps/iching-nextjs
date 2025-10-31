export type User = {
  id: number
  email: string
  name: string // adiciona name
  password: string
  createdAt: string
  emailVerified?: boolean
}

export type SafeUser = {
  id: number
  email: string
  name?: string
  welcomeEmailSent?: boolean
  emailVerified?: boolean
}

export type LoginState = {
  errors: { email?: string[]; password?: string[] }
  success?: boolean
  userId?: number
  name?: string
}

export type RegisterState = {
  errors: { name?: string[]; email?: string[]; password?: string[] }
  success?: boolean
  userId?: number
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: SafeUser | null
  loading: boolean
  refreshAuth: () => void
}
