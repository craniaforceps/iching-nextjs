import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { LoginState, RegisterState } from '@/lib/auth/types'

type AuthState = LoginState | RegisterState

interface RouterType {
  push: (url: string) => void
}

export function useAuthFeedback(
  state: AuthState | null | undefined,
  successMessage: string,
  redirectUrl: string,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) {
  useEffect(() => {
    if (!state) return

    const handle = async () => {
      if (state.success) {
        await refreshAuth?.()
        setTimeout(() => {
          toast.success(successMessage)
          router.push(redirectUrl)
        }, 50)
        return
      }

      const errors = [
        ...(state.errors?.email ?? []),
        ...(state.errors?.password ?? []),
      ]
      if (errors.length) toast.error(errors.join(' • '))
    }

    handle()
  }, [state, refreshAuth, router, successMessage, redirectUrl])
}

// Aliases para compatibilidade
export const useLoginFeedback = (
  state: LoginState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(
    state,
    'Sessão iniciada com sucesso!',
    '/dashboard',
    refreshAuth,
    router
  )

export const useRegisterFeedback = (
  state: RegisterState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) =>
  useAuthFeedback(
    state,
    'Conta criada com sucesso! Bem-vindo(a)!',
    '/dashboard',
    refreshAuth,
    router
  )
