'use server'

import { SettingsChangeType } from '@/lib/settings/types'
import { getCurrentUser, setSession } from '@/lib/auth/session'
import {
  changeEmailService,
  changePasswordService,
  deleteAccountService,
  sendContactMessageService,
} from '@/lib/settings/settingsServices'

export async function changeEmailAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  const newEmail = formData.get('newEmail') as string
  const password = formData.get('password') as string

  try {
    await changeEmailService(user.id, newEmail, password)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao atualizar email' }
  }
}

export async function changePasswordAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword)
    return { success: false, error: 'As passwords não coincidem' }

  try {
    await changePasswordService(user.id, currentPassword, newPassword)
    return { success: true }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Erro ao atualizar password',
    }
  }
}

export async function sendContactMessageAction(
  _prevState: SettingsChangeType,
  formData: FormData
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user?.email)
    return { success: false, error: 'Utilizador não autenticado' }

  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!subject || !message)
    return { success: false, error: 'Preencha todos os campos' }

  try {
    console.log('Chamando service de contacto...')
    await sendContactMessageService(user.id, user.email, subject, message)
    return { success: true }
  } catch (err: any) {
    console.error('Erro no service:', err)
    return { success: false, error: err.message || 'Erro ao enviar mensagem' }
  }
}

export async function deleteAccountAction(
  _prevState: SettingsChangeType,
  _payload?: unknown
): Promise<SettingsChangeType> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autenticado' }

  try {
    await deleteAccountService(user.id)
    await setSession('')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao apagar conta' }
  }
}
