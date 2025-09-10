import { successResponse } from '@/lib/api/responses'
// import { setSecurityHeaders } from '@/lib/api/securityHeaders'

const COOKIE_NAME = 'session'

export async function POST() {
  const response = successResponse({ success: true }, 200)

  response.cookies.delete({
    name: COOKIE_NAME,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  // setSecurityHeaders(response)
  return response
}
