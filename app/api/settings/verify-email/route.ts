import { NextRequest, NextResponse } from 'next/server'
import db from '@/data/db/db'
import { encrypt, setSession } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Token em falta' }, { status: 400 })
  }

  const user = await db.get(
    `SELECT * FROM users
     WHERE verification_token = ?
     AND verification_token_expires > datetime('now')`,
    [token]
  )

  if (!user) {
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 400 }
    )
  }

  // Atualiza DB
  await db.run(
    `UPDATE users
     SET emailVerified = 1,
         verification_token = NULL,
         verification_token_expires = NULL
     WHERE id = ?`,
    [user.id]
  )

  // ✅ Atualiza cookie de sessão (se o utilizador estiver autenticado)
  const newSession = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: true,
  })
  await setSession(newSession)

  // Redireciona para página de sucesso
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verificado`)
}
