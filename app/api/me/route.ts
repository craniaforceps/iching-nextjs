import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/auth/session'
import { findUserById } from '@/lib/auth/user'

export async function authenticateSession(sessionValue: string | undefined) {
  try {
    const payload = await decrypt(sessionValue)
    if (!payload || typeof payload.userId !== 'number') {
      throw new Error('Sessão inválida')
    }
    const user = findUserById(payload.userId)
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

export function handleError(error: unknown) {
  console.error('Erro:', error)
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Erro desconhecido' },
    { status: 500 }
  )
}

export function successResponse(data: unknown) {
  return NextResponse.json(data, { status: 200 })
}

export function errorResponse(error: unknown, status: number) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Erro desconhecido' },
    { status }
  )
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
    return handleError(error)
  }
}
