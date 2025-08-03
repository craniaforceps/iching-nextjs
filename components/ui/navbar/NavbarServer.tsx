// app/components/NavbarServer.tsx
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/auth/session'
import NavbarWrapper from './NavbarWrapper'

export default async function NavbarServer() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  const payload = session?.value ? await decrypt(session.value) : null
  const isAuthenticated = !!payload?.userId

  return <NavbarWrapper isAuthenticated={isAuthenticated} />
}
