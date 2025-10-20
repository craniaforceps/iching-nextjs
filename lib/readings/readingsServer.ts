'use server'

import { validateReadingInput } from './readingHelpers'
import { insertUserReading } from './readingsRepository'
import { getCurrentUser } from '@/lib/auth/session'

export async function saveReadingServer(payload: unknown) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Utilizador não autenticado')

  const data = validateReadingInput({
    ...(payload as object),
    user_id: user.id,
  })
  insertUserReading(data)
  return { success: true }
}
