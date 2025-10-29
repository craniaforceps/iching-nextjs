import { findUserByEmail } from './authRepository'

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
