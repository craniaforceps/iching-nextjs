import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

// Chave guardada e encoding da mesma
const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET não definida')
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(
  payload: Record<string, string | number | boolean>
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // algoritmo
    .setIssuedAt()
    .setExpirationTime('7d') // validade
    .sign(encodedKey) // assinatura
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
