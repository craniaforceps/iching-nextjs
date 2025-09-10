import { authenticateUser } from '@/lib/auth/authHelpers'
import {
  getUserReadings,
  deleteUserReading,
  updateUserReading,
} from '@/lib/readings/readingHelpers'
import { successResponse, errorResponse } from '@/lib/api/responses'

// GET /api/readings (leituras do utilizador)
export async function GET() {
  try {
    const userId = await authenticateUser()
    const readings = getUserReadings(userId)
    return successResponse(readings, 200)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET /readings:', error)
    return errorResponse({ error }, 500)
  }
}

// DELETE /api/readings/:id (apenas do utilizador)
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await authenticateUser()
    const id = Number(params.id)
    if (isNaN(id)) throw new Error('ID inválido')

    // Chama deleteUserReading passando o id e o userId
    const result = deleteUserReading(id, userId)

    return successResponse(result, 200)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no DELETE /readings/:id:', error)
    return errorResponse({ error }, 500)
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const userId = await authenticateUser()

    // Resolve os params antes de usar
    const { id: idStr } = await context.params
    const id = Number(idStr)
    if (isNaN(id)) throw new Error('ID inválido')

    const body = await req.json()
    const { question, notes } = body

    // Atualiza só os campos enviados
    const updated = updateUserReading(id, userId, { question, notes })

    return successResponse(updated, 200)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no PUT /readings/:id:', error)
    return errorResponse({ error }, 500)
  }
}
