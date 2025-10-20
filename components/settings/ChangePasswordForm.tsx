'use client'

import { useActionState } from 'react'
import { changePasswordAction } from '@/lib/settings/settingsActions'
import SettingsFormContainer from './SettingsFormContainer'
import SettingsField from './SettingsField'
import Button from '@/components/ui/button/Button'

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, {
    success: false,
    error: '',
  })

  return (
    <form action={formAction} className="">
      <SettingsFormContainer
        title="Alterar Password"
        error={state.error}
        success={state.success ? 'Password atualizada!' : undefined}
      >
        <SettingsField
          name="currentPassword"
          type="password"
          placeholder="Password atual"
          required
        />
        <SettingsField
          name="newPassword"
          type="password"
          placeholder="Nova password"
          required
        />
        <SettingsField
          name="confirmPassword"
          type="password"
          placeholder="Confirmar nova password"
          required
        />
        <Button
          text={isPending ? 'A atualizar...' : 'Guardar'}
          disabled={isPending}
        />
      </SettingsFormContainer>
    </form>
  )
}
