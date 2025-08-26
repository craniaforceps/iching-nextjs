import { NextResponse } from 'next/server'

// Encrypt
import { encrypt } from '@/lib/auth/session'

export async function POST(request: Request) {
  // Recebe o userId na requisição e destrutura
  const { userId } = await request.json()

  // Valida se« existe o userId
  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId' },
      { status: 400 }
    )
  }

  // Encripta o userId e define a expiração para 7 dias
  const token = await encrypt({ userId })
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias

  // Define uma resposta bem-sucedida e atribui o token à mesma, tal como outras questões de segurança
  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
    sameSite: 'lax',
  })

  response.headers.set('Content-Security-Policy', "default-src 'self'")

  // Finalmente devolve o response
  return response
}
