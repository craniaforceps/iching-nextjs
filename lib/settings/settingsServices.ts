import {
  getUserByEmail,
  updateEmail,
  updatePassword,
  insertContactMessage,
  deleteUser,
} from './settingsRepository'
import {
  validate,
  verifyPassword,
  hashPassword,
  getUserOrFail,
} from './settingsHelpers'
import { emailSchema, passwordSchema, contactSchema } from './settingsSchemas'

// Serviço para mudar email
export async function changeEmailService(
  userId: number,
  newEmail: string,
  password: string
) {
  validate(emailSchema, newEmail)

  const existing = await getUserByEmail(newEmail)
  if (existing) throw new Error('Já existe uma conta com esse email')

  const user = await getUserOrFail(userId)
  await verifyPassword(password, user.password)

  await updateEmail(userId, newEmail)
  return { success: true }
}

// Serviço para mudar password
export async function changePasswordService(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  validate(passwordSchema, newPassword)

  const user = await getUserOrFail(userId)
  await verifyPassword(currentPassword, user.password)

  const newHash = await hashPassword(newPassword)
  await updatePassword(userId, newHash)

  return { success: true }
}

// Serviço para enviar mensagem de contacto
export async function sendContactMessageService(
  userId: number,
  email: string,
  subject: string,
  message: string
) {
  if (!contactSchema) {
    throw new Error('contactSchema está undefined')
  }

  validate(contactSchema, { subject, message })

  await insertContactMessage(userId, email, subject, message)
  return { success: true }
}

// Serviço para apagar conta
export async function deleteAccountService(userId: number) {
  if (!userId) throw new Error('Não autenticado')

  await deleteUser(userId)
  return { success: true }
}
