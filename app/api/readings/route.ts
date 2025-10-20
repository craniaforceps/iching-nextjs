import { successResponse, errorResponse } from '@/lib/utils/responses'
import {
  validateReadingInput,
  mapRowToView,
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

    const rows = getUserReadings(user.id)
    return successResponse(rows.map(mapRowToView))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 500)
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) return errorResponse({ error: 'Não autenticado' }, 401)

    const body = await req.json()
    const data = validateReadingInput({ ...body, user_id: user.id })
    const row = insertUserReading(data)

    return successResponse(mapRowToView(row), 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 400)
  }
}
