import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'

type ReadingInput = {
  question: string
  notes: string
  originalBinary: string
  mutantBinary: string
}

export async function saveReading(payload: ReadingInput) {
  const meRes = await fetch('/api/me')
  const meJson = await meRes.json()

  if (!meJson.data?.user?.id) {
    throw new Error('Utilizador não identificado')
  }

  const parsed = ReadingInputSchema.safeParse({
    ...payload,
    user_id: meJson.data.user.id,
  })

  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => i.message).join(', ')
    throw new Error('Erro de validação: ' + errors)
  }

  const saveRes = await fetch('/api/readings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })
  const json = await saveRes.json()

  if (!json.success) {
    throw new Error(json.error)
  }

  return json
}
