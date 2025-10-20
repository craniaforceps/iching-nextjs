import type { SafeUser } from '@/lib/auth/types'
import { ReadingInputSchema } from '@/lib/hexagram/hexagramSchemas'

// Tipo base usado no frontend
export type ReadingInput = {
  question: string
  notes: string
  originalBinary: string
  mutantBinary: string
}

/**
 * Cria uma nova leitura
 */
export async function saveReading(payload: ReadingInput, user: SafeUser) {
  if (!user?.id) {
    throw new Error('Utilizador não identificado')
  }

  // ✅ validação antes do envio
  const parsed = ReadingInputSchema.safeParse({
    ...payload,
    user_id: user.id,
  })

  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => i.message).join(', ')
    throw new Error(`Erro de validação: ${errors}`)
  }

  const res = await fetch('/api/readings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Erro ao guardar leitura')
  }

  return json.data
}

/**
 * Atualiza uma leitura existente
 */
export async function updateReading(
  id: number,
  payload: Partial<ReadingInput>,
  _user: SafeUser
) {
  if (!id || id <= 0) throw new Error('ID inválido')

  const res = await fetch(`/api/readings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Erro ao atualizar leitura')
  }

  return json.data
}

/**
 * Apaga uma leitura existente
 */
export async function deleteReading(id: number, _user: SafeUser) {
  if (!id || id <= 0) throw new Error('ID inválido')

  const res = await fetch(`/api/readings/${id}`, { method: 'DELETE' })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Erro ao apagar leitura')
  }

  return json.data
}

/**
 * Obtém todas as leituras do utilizador
 */
export async function fetchUserReadings() {
  const res = await fetch('/api/readings')
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Erro ao buscar leituras')
  }

  return json.data
}

/**
 * Obtém uma leitura individual por ID
 */
export async function fetchReadingById(id: number) {
  if (!id || id <= 0) throw new Error('ID inválido')

  const res = await fetch(`/api/readings/${id}`)
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Erro ao buscar leitura')
  }

  return json.data
}
