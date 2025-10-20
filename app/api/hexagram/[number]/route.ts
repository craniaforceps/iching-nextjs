import { successResponse, errorResponse } from '@/lib/utils/responses'
import { validateNumber } from '@/lib/hexagram/hexagramHelpers'
import { getHexagramByNumber } from '@/lib/hexagram/hexagramServices'

export async function GET(_req: Request, context: any) {
  const { params } = context
  try {
    const num = validateNumber(Number(params.number))
    if (!num) return errorResponse('Número inválido (1-64)', 400)

    const hexagram = getHexagramByNumber(num)
    if (!hexagram) return errorResponse('Hexagrama não encontrado', 404)

    return successResponse(hexagram, 200)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET /hexagram/:number:', message)
    return errorResponse({ error: message }, 500)
  }
}
