import { NextResponse } from 'next/server'
import { encrypt } from '@/lib/auth/session'

export async function POST(request: Request) {
  const { userId } = await request.json()

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId' },
      { status: 400 }
    )
  }

  const token = await encrypt({ userId })
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias

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

  return response
}
