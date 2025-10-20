import {
  getUserById,
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

// Serviços
export async function changeEmailService(
  userId: number,
  newEmail: string,
  password: string
) {
  validate(emailSchema, newEmail)

  if (getUserByEmail(newEmail))
    throw new Error('Já existe uma conta com esse email')

  const user = getUserOrFail(userId)
  await verifyPassword(password, user.password)

  updateEmail(userId, newEmail)
  return { success: true }
}

export async function changePasswordService(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  validate(passwordSchema, newPassword)

  const user = getUserOrFail(userId)
  await verifyPassword(currentPassword, user.password)

  const newHash = await hashPassword(newPassword)
  updatePassword(userId, newHash)

  return { success: true }
}

export async function sendContactMessageService(
  userId: number,
  email: string,
  subject: string,
  message: string
) {
  console.log('Validando e enviando mensagem...', {
    subject,
    message,
    contactSchema,
  })

  if (!contactSchema) {
    throw new Error('contactSchema está undefined')
  }

  // valida os dados
  validate(contactSchema, { subject, message })

  // insere na DB
  insertContactMessage(userId, email, subject, message)
  return { success: true }
}

export async function deleteAccountService(userId: number) {
  if (!userId) throw new Error('Não autenticado')

  deleteUser(userId)
  return { success: true }
}
