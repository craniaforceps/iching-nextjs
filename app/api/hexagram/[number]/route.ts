import { successResponse, errorResponse } from '@/lib/utils/responses'
import { validateNumber } from '@/lib/hexagram/hexagramHelpers'
import { getHexagramByNumber } from '@/lib/hexagram/hexagramServices'

// GET /api/hexagram/:number - Este endpoint retorna o hexagrama correspondente ao número fornecido (1-64).
export async function GET(
  _req: Request,
  { params }: { params: { number: string } }
) {
  try {
    // Validar número do hexagrama
    const num = validateNumber(params.number)
    if (!num) return errorResponse('Número inválido (1-64)', 400)

    // Obter hexagrama pelo número
    const hexagram = getHexagramByNumber(num)
    if (!hexagram) return errorResponse('Hexagrama não encontrado', 404)

    return successResponse(hexagram, 200)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro no GET /hexagram/:number:', message)
    return errorResponse({ error: message }, 500)
  }
}
