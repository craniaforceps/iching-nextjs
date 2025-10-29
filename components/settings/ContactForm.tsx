'use client'

import { useActionState, useState } from 'react'
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

  const [topic, setTopic] = useState<string>('ajuda')

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value)
  }

  return (
    <form action={formAction}>
      <SettingsFormContainer
        title="Formulário de Contacto"
        error={state.error}
        success={state.success ? 'Mensagem enviada com sucesso!' : undefined}
      >
        {/* dropdown */}
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="topic"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden"
          >
            Tipo de contacto
          </label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={handleTopicChange}
            required
            className="border p-2 rounded w-full text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="ajuda">Ajuda nas leituras</option>
            <option value="sugestoes">Sugestões de melhoria</option>
            <option value="problemas">Comunicação de problemas</option>
            <option value="outras">Outras informações</option>
          </select>
        </div>

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
