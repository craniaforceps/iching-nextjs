import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

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
