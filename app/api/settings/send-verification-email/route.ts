import sendgrid from '@sendgrid/mail'
import { randomBytes } from 'crypto'
import { getUserById } from '@/lib/settings/settingsRepository'
import db from '@/data/db/db'
import { NextRequest, NextResponse } from 'next/server'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId)
      return NextResponse.json({ error: 'UserId obrigatório' }, { status: 400 })

    const user = await getUserById(userId)
    if (!user)
      return NextResponse.json(
        { error: 'Utilizador não encontrado' },
        { status: 404 }
      )

    // Gera token único
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000)

    await db.run(
      `UPDATE users
         SET verification_token = ?, verification_token_expires = ?
       WHERE id = ?`,
      [token, expires.toISOString(), user.id]
    )

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/verify-email?token=${token}`

    await sendgrid.send({
      to: user.email,
      from: 'franciscopereirareis@proton.me',
      subject: 'Verifica o teu email',
      html: `
        <p>Olá ${user.name || 'utilizador'},</p>
        <p>Por favor confirma o teu email clicando no link abaixo:</p>
        <p><a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" style="color: #1a73e8;">Verificar email</a></p>
        <p>Se não conseguires clicar, copia e cola este link:</p>
        <p>${verificationUrl}</p>
        <p>O link expira em 1 hora.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Erro ao enviar email de verificação:', err)
    return NextResponse.json(
      { error: 'Erro ao enviar email de verificação' },
      { status: 500 }
    )
  }
}
