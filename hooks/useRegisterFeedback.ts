// hooks/useRegisterFeedback.ts
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { RegisterState } from '@/lib/auth/types'

export type RouterType = {
  push: (url: string) => void
}

export function useRegisterFeedback(
  state: RegisterState | null | undefined,
  refreshAuth: () => void | Promise<void>,
  router: RouterType
) {
  useEffect(() => {
    if (!state) return

    const handle = async () => {
      if (state.success) {
        await refreshAuth?.()

        // Pequeno delay para garantir que ToastContainer está montado
        setTimeout(() => {
          toast.success('Conta criada com sucesso! Bem-vindo(a)!')
          router.push('/dashboard')
        }, 50)

        return
      }

      const allErrors = [
        ...(state.errors?.email ?? []),
        ...(state.errors?.password ?? []),
      ]
      if (allErrors.length) toast.error(allErrors.join(' • '))
    }

    handle()
  }, [state, refreshAuth, router])
}
