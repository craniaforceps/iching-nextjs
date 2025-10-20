import type { LoginState } from '@/lib/auth/types'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export function useLoginFeedback(
  state: LoginState,
  refreshAuth: () => void | Promise<void>,
  router: any
) {
  useEffect(() => {
    if (!state) return

    const handle = async () => {
      if (state.success) {
        await refreshAuth?.()

        // Pequeno delay para garantir que ToastContainer está montado
        setTimeout(() => {
          toast.success('Sessão iniciada com sucesso!')
          router.push('/dashboard')
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
  }, [state, refreshAuth, router])
}
