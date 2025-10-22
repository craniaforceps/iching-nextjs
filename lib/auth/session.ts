'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SESSION_DURATION = '7d'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 dias

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET não definida')

const encodedKey = new TextEncoder().encode(secretKey)

// Criar token JWT
export async function encrypt(payload: { userId: number; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(encodedKey)
}

// Verificar e decodificar token JWT
export async function decrypt(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as { userId: number; email: string }
  } catch {
    return null
  }
}

// Criar ou remover cookie de sessão
export async function setSession(token?: string) {
  const store = await cookies()
  if (!token) {
    store.delete('session')
  } else {
    store.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      path: '/',
      sameSite: 'lax',
      maxAge: MAX_AGE,
    })
  }
}

// Obter utilizador atual a partir do cookie
export async function getCurrentUser() {
  const store = await cookies()
  const token = store.get('session')?.value
  if (!token) return null

  const payload = await decrypt(token)
  if (!payload || typeof payload.userId !== 'number' || !payload.email)
    return null

  return { id: payload.userId, email: payload.email }
}

export async function logoutUser() {
  await setSession('')
}
