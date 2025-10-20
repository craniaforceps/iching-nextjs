import { successResponse, errorResponse } from '@/lib/utils/responses'
import { mapRowToView } from '@/lib/readings/readingHelpers'
import {
  getReadingById,
  updateReading,
  deleteReading,
} from '@/lib/readings/readingsRepository'
import { getCurrentUser } from '@/lib/auth/session'

export async function GET(_req: Request, context: any) {
  const { params } = context
  try {
    const user = await getCurrentUser()
    const id = Number(params.id)
    if (isNaN(id)) return errorResponse({ error: 'ID inválido' }, 400)

    const reading = getReadingById(id)
    if (!reading) return errorResponse({ error: 'Leitura não encontrada' }, 404)

    return successResponse(mapRowToView(reading))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 500)
  }
}

export async function PUT(req: Request, context: any) {
  const { params } = context
  try {
    const user = await getCurrentUser()
    const id = Number(params.id)
    if (isNaN(id)) return errorResponse({ error: 'ID inválido' }, 400)

    const body = await req.json()
    const updated = updateReading(id, body)
    return successResponse(mapRowToView(updated!))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 400)
  }
}

export async function DELETE(_req: Request, context: any) {
  const { params } = context
  try {
    const user = await getCurrentUser()
    const id = Number(params.id)
    if (isNaN(id)) return errorResponse({ error: 'ID inválido' }, 400)

    deleteReading(id)
    return successResponse({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 500)
  }
}
