import { getHexagramByNumber } from '@/lib/queries/getHexagramByNumber'

function validateNumber(param: string): number | null {
  const num = Number(param)
  if (isNaN(num)) {
    return null
  }
  return num
}

// !!! mudar o type de unknown para o tipo correto do hexagrama
async function getHexagram(number: number): Promise<unknown> {
  const hexagram = await getHexagramByNumber(number)
  return hexagram || null
}

// !!! mudar o type de unknown para o tipo correto do hexagrama
function createResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function GET(
  req: Request,
  { params }: { params: { number: string } }
) {
  const num = validateNumber(params.number)
  if (!num) {
    return createResponse({ error: 'Invalid number' }, 400)
  }

  const hexagram = await getHexagram(num)
  if (!hexagram) {
    return createResponse({ error: 'Not found' }, 404)
  }

  return createResponse(hexagram, 200)
}
