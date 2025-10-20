import { successResponse, errorResponse } from '@/lib/utils/responses'
import { mapRowToView } from '@/lib/readings/readingHelpers'
import {
  getReadingById,
  updateReading,
  deleteReading,
} from '@/lib/readings/readingsRepository'
import { getCurrentUser } from '@/lib/auth/session'

// GET /api/readings/:id - Retorna a leitura pelo ID
// PUT /api/readings/:id - Atualiza a leitura pelo ID
// DELETE /api/readings/:id - Elimina a leitura pelo ID

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    // Validar ID
    const id = Number(params.id)
    if (isNaN(id)) throw new Error('ID inválido')

    // Obter leitura pelo ID
    const reading = getReadingById(id)
    if (!reading) return errorResponse({ error: 'Leitura não encontrada' }, 404)

    // Retornar leitura mapeada para a view
    return successResponse(mapRowToView(reading))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 500)
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    const id = Number(params.id)
    if (isNaN(id)) throw new Error('ID inválido')

    const body = await req.json()
    const updated = updateReading(id, body)
    return successResponse(mapRowToView(updated!))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 400)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    const id = Number(params.id)
    if (isNaN(id)) throw new Error('ID inválido')

    deleteReading(id)
    return successResponse({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return errorResponse({ error: message }, 500)
  }
}
