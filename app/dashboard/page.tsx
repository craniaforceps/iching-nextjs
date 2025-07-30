import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/auth/session'

export default async function DashboardPage() {
  const cookieStore = await cookies() // await aqui!
  const cookie = cookieStore.get('session')?.value

  if (!cookie) {
    redirect('/login')
  }

  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return (
    <main>
      <h1>Bem-vindo ao Dashboard</h1>
      {/* resto do conteúdo */}
    </main>
  )
}
