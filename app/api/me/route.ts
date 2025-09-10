import { cookies } from 'next/headers'
import { decrypt } from '@/lib/auth/session'
import { findUserById } from '@/lib/auth/user'
import { errorResponse, successResponse } from '@/lib/api/responses'

export async function authenticateSession(sessionValue: string | undefined) {
  try {
    const payload = await decrypt(sessionValue)
    if (!payload || typeof payload.userId !== 'number') {
      errorResponse('Sessão inválida', 401)
      throw new Error('Sessão inválida')
    }
    const user = await findUserById(payload.userId)
    if (!user) {
      throw new Error('Utilizador não encontrado')
    }
    return user
  } catch (error) {
    throw new Error(
      `Erro ao validar sessão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    )
  }
}

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
