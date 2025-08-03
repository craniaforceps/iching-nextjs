import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/auth/session'
import { findUserById } from '@/lib/auth/user'

export async function GET() {
  const cookieStore = await cookies() // não precisas de await aqui
  const session = cookieStore.get('session')

  if (!session?.value) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const payload = await decrypt(session.value)

    if (!payload || typeof payload.userId !== 'number') {
      return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 })
    }

    const user = findUserById(payload.userId)

    if (!user) {
      return NextResponse.json(
        { error: 'Utilizador não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Erro ao validar sessão:', error)
    return NextResponse.json(
      { error: 'Erro interno ao validar sessão' },
      { status: 500 }
    )
  }
}
