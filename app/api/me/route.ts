import { cookies } from 'next/headers'
import { errorResponse, successResponse } from '@/lib/api/responses'
import { authenticateSession } from '@/lib/auth/authHelpers'

// GET /api/me
// Este endpoint verifica a sessão do utilizador através de um cookie e retorna os detalhes do utilizador autenticado.
export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session?.value) {
    return errorResponse('Não autenticado', 401)
  }

  try {
    const user = await authenticateSession(session.value)
    return successResponse({ user: { id: user.id, email: user.email } })
  } catch (error) {
    return errorResponse(error, 500)
  }
}
