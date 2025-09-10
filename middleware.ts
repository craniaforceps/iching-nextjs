import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import { setSecurityHeaders } from '@/lib/api/securityHeaders'

const protectedRoutes = ['/dashboard', '/historico', '/tabelas']
const publicRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const cookie = req.cookies.get('session')?.value
  const session = cookie ? await decrypt(cookie) : null

  // Rota protegida sem sessão → redireciona para login
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !session?.userId
  ) {
    return setSecurityHeaders(
      NextResponse.redirect(new URL('/login', req.nextUrl))
    )
  }

  // Rota pública com sessão → redireciona para dashboard
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) &&
    session?.userId
  ) {
    return setSecurityHeaders(
      NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    )
  }

  // Todas as outras → segue normal mas aplica headers
  return setSecurityHeaders(NextResponse.next())
}

// Aplica middleware só a estas rotas (opcional)
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/tabelas'],
}
