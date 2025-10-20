'use client'

import { useEffect } from 'react'
import { useActionState } from 'react'
import { changeEmailAction } from '@/lib/settings/settingsActions'
import SettingsFormContainer from './SettingsFormContainer'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/context/AuthProvider'
import SettingsField from './SettingsField'

export default function ChangeEmailForm() {
  const { refreshAuth } = useAuth()
  const [state, formAction, isPending] = useActionState(changeEmailAction, {
    success: false,
    error: '',
  })

  useEffect(() => {
    if (state.success) refreshAuth()
  }, [state.success, refreshAuth])

  return (
    <form action={formAction}>
      <SettingsFormContainer
        title="Alterar Email"
        error={state.error}
        success={state.success ? 'Email atualizado!' : undefined}
      >
        <SettingsField
          name="newEmail"
          type="email"
          placeholder="Novo email"
          required
        />
        <SettingsField
          name="password"
          type="password"
          placeholder="Password atual"
          required
        />
        <Button
          text={isPending ? 'A atualizar...' : 'Atualizar Email'}
          disabled={isPending}
        />
      </SettingsFormContainer>
    </form>
  )
}
