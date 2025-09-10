import { getHexagramByNumber } from '@/lib/hexagram/getHexagramByNumber'
import { successResponse, errorResponse } from '@/lib/api/responses'
import { validateNumber } from '@/lib/hexagram/helpers'

// Handler GET no App Router
export async function GET(
  req: Request,
  context: { params: { number: string } }
) {
  const params = await context.params // <-- resolve o aviso
  const number = params.number
  const num = validateNumber(number)
  if (!num) return errorResponse('Invalid number', 400)

  const hexagram = await getHexagramByNumber(num)
  if (!hexagram) return errorResponse('Not found', 404)

  return successResponse(hexagram, 200)
}
