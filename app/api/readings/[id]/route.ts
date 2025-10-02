import { authenticateUser } from '@/lib/auth/authHelpers'
import {
  getUserReadings,
  deleteUserReading,
  updateUserReading,
  getUserReadingById,
} from '@/lib/readings/readingHelpers'
import { successResponse, errorResponse } from '@/lib/api/responses'

// GET /api/readings/:id - uma leitura específica por utilizador (Não está a ser utilizado)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Obter o ID do utilizador autenticado
    const userId = await authenticateUser()
    const id = Number(params.id)
    if (isNaN(id)) throw new Error('ID inválido')

    // Função que devolve apenas a leitura específica do user
    const reading = getUserReadingById(id, userId)
    if (!reading) {
      return errorResponse({ error: 'Leitura não encontrada' }, 404)
    }

    return successResponse(reading, 200)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET /readings/:id:', error)
    return errorResponse({ error }, 500)
  }
}

// DELETE /api/readings/:id - apaga leituras por utilizador
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

// PUT /api/readings/:id - atualiza uma leitura por utilizador
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
