'use server'

import { getCurrentUser } from '@/lib/auth/session'
import { insertUserReading } from '@/lib/readings/readingsRepository'
import { successResponse, errorResponse } from '@/lib/utils/responses'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return errorResponse('Não autenticado', 401)
    }

    const body = await req.json()
    const { question, notes, lines, hexagrams } = body

    if (!question || !lines || !hexagrams) {
      return errorResponse('Dados incompletos', 400)
    }

    // Usa o readingsRepository para inserir a leitura
    const reading = await insertUserReading({
      user_id: user.id,
      question,
      notes: notes ?? '',
      originalBinary: hexagrams.match1.binary,
      mutantBinary: hexagrams.match2.binary,
    })

    return successResponse(reading)
  } catch (err) {
    console.error('Erro ao restaurar leitura:', err)
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse(message, 500)
  }
}
