import { NextResponse } from 'next/server'
import { encrypt } from '@/lib/auth/session'

export async function POST(request: Request) {
  const { userId } = await request.json()

  const token = await encrypt(userId)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

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
