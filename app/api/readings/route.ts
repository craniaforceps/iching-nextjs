import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'
import { authenticateUser } from '@/lib/auth/authHelpers'
import { successResponse, errorResponse } from '@/lib/api/responses'
import {
  getUserReadings,
  insertUserReading,
} from '@/lib/readings/readingHelpers'

// GET /api/readings - todas as leituras do utilizador
export async function GET() {
  try {
    const userId: number = await authenticateUser()
    // Função que devolve todas as leituras do utilizador
    const readings = getUserReadings(userId)
    return successResponse(readings)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET readings:', error)
    return errorResponse({ error }, 500)
  }
}

// POST /api/readings - cria uma nova leitura do utilizador
export async function POST(req: Request) {
  try {
    const userId = await authenticateUser()
    const body: unknown = await req.json()

    if (typeof body !== 'object' || body === null) {
      return errorResponse({ error: 'Payload inválido' }, 400)
    }

    const parsed = ReadingInputSchema.safeParse({
      ...(body as Record<string, unknown>),
      user_id: userId,
    })
    if (!parsed.success) {
      return errorResponse({ error: parsed.error.message }, 400)
    }
    // Chama a função para inserir a leitura na base de dados
    insertUserReading(parsed.data)

    return successResponse({ success: true }, 201)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no POST readings:', error)
    return errorResponse({ error }, 500)
  }
}
