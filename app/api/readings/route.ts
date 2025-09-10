import { ReadingInputSchema } from '@/lib/schemas/hexagramSchemas'
import { authenticateUser } from '@/lib/auth/authHelpers'
import { successResponse, errorResponse } from '@/lib/api/responses'
import {
  getUserReadings,
  insertUserReading,
} from '@/lib/readings/readingHelpers'

export async function GET() {
  try {
    const userId: number = await authenticateUser()
    const readings = getUserReadings(userId)
    return successResponse(readings)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET readings:', error)
    return errorResponse({ error }, 500)
  }
}

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

    insertUserReading(parsed.data)

    // ✅ Nada a devolver, só status 204
    return successResponse({ success: true }, 201)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no POST readings:', error)
    return errorResponse({ error }, 500)
  }
}
