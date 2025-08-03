import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/data/db/db'
import { registerSchema } from '@/lib/schemas/authSchemas'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')
      return NextResponse.json({ error: messages }, { status: 400 })
    }

    const { email, password } = parsed.data

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Verificar se já existe um utilizador com este email
    const existing = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(cleanEmail)

    if (existing) {
      return NextResponse.json(
        { error: 'Este email já está registado' },
        { status: 400 }
      )
    }

    // Hash da password
    const hashed = await bcrypt.hash(cleanPassword, 10)

    // Inserir novo utilizador na base de dados
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    const info = stmt.run(cleanEmail, hashed)

    return NextResponse.json({ success: true, id: info.lastInsertRowid })
  } catch (err) {
    return NextResponse.json(
      { error: `Erro ao processar o pedido ${err}` },
      { status: 500 }
    )
  }
}
