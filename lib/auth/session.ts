import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET não definida')
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(
  payload: Record<string, string | number | boolean>
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(token: string | undefined) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (err) {
    console.log(err)
    return null
  }
}

export function setSessionCookie(response: NextResponse, token: string) {
  const maxAge = 60 * 60 * 24 * 7 // 7 dias
  response.cookies.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge,
  })
}
