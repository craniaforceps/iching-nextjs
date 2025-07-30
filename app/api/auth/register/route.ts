import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/data/db/db'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email e password são obrigatórios' },
      { status: 400 }
    )
  }

  // Limpar strings (trim) opcional
  const cleanEmail = email.trim().toLowerCase()
  const cleanPassword = password.trim()

  // Validação simples do email (exemplo)
  if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const existing = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(cleanEmail)
  if (existing) {
    return NextResponse.json(
      { error: 'Este email já está registado' },
      { status: 400 }
    )
  }

  const hashed = await bcrypt.hash(cleanPassword, 10)
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
  const info = stmt.run(cleanEmail, hashed)

  return NextResponse.json({ success: true, id: info.lastInsertRowid })
}
