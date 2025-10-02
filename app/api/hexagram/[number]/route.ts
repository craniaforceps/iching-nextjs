import { getHexagramByNumber } from '@/lib/hexagram/getHexagramByNumber'
import { successResponse, errorResponse } from '@/lib/api/responses'
import { validateNumber } from '@/lib/hexagram/helpers'

// GET /api/hexagram/:number
// Este endpoint utiliza como param o número do hexagrama (1-64).
// Retorna as informações do hexagrama correspondente presentes na base de dados.
export async function GET(
  req: Request,
  context: { params: { number: string } }
) {
  const params = await context.params
  const number = params.number
  // Validar o número do hexagrama (1-64)
  const num = validateNumber(number)
  if (!num) return errorResponse('Invalid number', 400)
  // Buscar o hexagrama pelo número na base de dados
  const hexagram = await getHexagramByNumber(num)
  if (!hexagram) return errorResponse('Not found', 404)

  return successResponse(hexagram, 200)
}
