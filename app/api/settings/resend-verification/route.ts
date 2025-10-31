import { NextRequest, NextResponse } from 'next/server'
import { getUserById } from '@/lib/settings/settingsRepository'
import { saveVerificationToken } from '@/lib/auth/authHelpers'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'UserId obrigatório' }, { status: 400 })
    }

    const user = await getUserById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'Utilizador não encontrado' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email já verificado' },
        { status: 400 }
      )
    }

    await saveVerificationToken(user.id, user.email, user.name ?? undefined)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ Erro ao reenviar email de verificação:', err)
    return NextResponse.json(
      { error: 'Erro ao reenviar email de verificação' },
      { status: 500 }
    )
  }
}
