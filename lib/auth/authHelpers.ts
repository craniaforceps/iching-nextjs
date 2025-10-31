import { findUserByEmail } from './authRepository'
import db from '@/data/db/db'
import { randomBytes } from 'crypto'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

/** Remove espaços e normaliza email e password */
export function sanitizeEmailPasswordName(
  email: string,
  password: string,
  name: string
) {
  return {
    sanitizedEmail: email.trim().toLowerCase(),
    sanitizedPassword: password.trim(),
    sanitizedName: name.trim(),
  }
}

/**
 * Verifica se o email já existe na base de dados.
 * Em vez de lançar erro, devolve `true` se existir e `false` caso contrário.
 */
export async function checkIfEmailExists(email: string): Promise<boolean> {
  const existingUser = await findUserByEmail(email)
  return Boolean(existingUser)
}

export async function saveVerificationToken(
  userId: number,
  email: string,
  name?: string
) {
  console.log('🚀 saveVerificationToken chamado para:', email)

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString()
  console.log('🔑 Token gerado:', token)

  await db.run(
    `UPDATE users
     SET verification_token = ?, verification_token_expires = ?
     WHERE id = ?`,
    [token, expires, userId]
  )
  console.log('💾 Token guardado na DB')

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/verify-email?token=${token}`
  console.log('🔗 Verification URL:', verificationUrl)

  try {
    await sendgrid.send({
      to: email,
      from: 'franciscopereirareis@proton.me',
      subject: 'Eu-Chingo: Verificação de email',
      html: `
        <p>Olá ${name || 'utilizador'},</p>
        <p>Obrigado por te registares no <strong>Eu-Chingo</strong>.</p>
        <p>Por favor confirma o teu email clicando no link abaixo:</p>
        <p><a href="${verificationUrl}" style="color: #2563eb;">Verificar Email</a></p>
        <p>Este link expira em 1 hora.</p>
      `,
    })
    console.log('📧 Email enviado com sucesso')
  } catch (err) {
    console.error('❌ Erro ao enviar email:', err)
  }
}
