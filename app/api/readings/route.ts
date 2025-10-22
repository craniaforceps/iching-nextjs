// app/api/readings/route.ts
export const runtime = 'nodejs'

import { successResponse, errorResponse } from '@/lib/utils/responses'
import {
  validateReadingInput,
  mapRowToViewAsync,
} from '@/lib/readings/readingHelpers'
import {
  getUserReadings,
  insertUserReading,
} from '@/lib/readings/readingsRepository'
import { getCurrentUser } from '@/lib/auth/session'

// GET /api/readings - Retorna todas as leituras do utilizador autenticado
// POST /api/readings - Cria uma nova leitura para o utilizador autenticado
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return errorResponse({ error: 'Não autenticado' }, 401)

    const rows = await getUserReadings(user.id) // já retorna ReadingRow[]
    const mappedRows = await Promise.all(rows.map(mapRowToViewAsync))

    return successResponse(mappedRows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro GET /readings:', message)
    return errorResponse({ error: message }, 500)
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return errorResponse({ error: 'Não autenticado' }, 401)

    const body = await req.json()
    const data = validateReadingInput({ ...body, user_id: user.id })
    const row = await insertUserReading(data) // garantir async

    const mappedRow = await mapRowToViewAsync(row)

    return successResponse(mappedRow, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro POST /readings:', message)
    return errorResponse({ error: message }, 400)
  }
}
