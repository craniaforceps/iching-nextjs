// app/api/settings/delete-account/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Lê cookie de sessão
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)

    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const userId = user.userId

    // 2️⃣ Apaga leituras associadas
    db.prepare('DELETE FROM readings WHERE user_id = ?').run(userId)

    // 3️⃣ Apaga utilizador
    db.prepare('DELETE FROM users WHERE id = ?').run(userId)

    // 4️⃣ Cria resposta e remove cookie de sessão
    const res = NextResponse.json({ success: true })
    res.cookies.set({
      name: 'session',
      value: '',
      maxAge: 0,
      path: '/',
    })

    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
