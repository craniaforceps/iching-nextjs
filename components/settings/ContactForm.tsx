'use client'

import { useActionState } from 'react'
import { sendContactMessageAction } from '@/lib/settings/settingsActions'
import SettingsFormContainer from './SettingsFormContainer'
import SettingsField from './SettingsField'
import Button from '@/components/ui/button/Button'

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessageAction,
    {
      success: false,
      error: '',
    }
  )

  return (
    <form action={formAction}>
      <SettingsFormContainer
        title="Formulário de Contacto"
        error={state.error}
        success={state.success ? 'Mensagem enviada com sucesso!' : undefined}
      >
        <SettingsField name="subject" placeholder="Assunto" required />
        <SettingsField
          name="message"
          placeholder="Mensagem"
          textarea
          required
        />
        <Button
          text={isPending ? 'A enviar...' : 'Enviar'}
          disabled={isPending}
        />
      </SettingsFormContainer>
    </form>
  )
}
