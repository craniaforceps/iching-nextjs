import './globals.css'
import { AuthProvider } from '@/context/AuthProvider'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import ThemeProvider from './theme/theme-provider'
import { getCurrentUser } from '@/lib/auth/session'
import AppLayout from '@/components/AppContent/AppLayout'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-serif',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'I Ching',
  description: 'Um website para consulta e divinação com I Ching',
  keywords: 'Hexagramas, I Ching, Filosofia Chinesa',
  icons: { icon: '/yin-yang.svg' },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialUser = await getCurrentUser()

  return (
    <html
      lang="pt"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white dark:bg-stone-900 text-stone-900 dark:text-gray-200 transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialUser={initialUser}>
            {/* AppLayout mantém Header, Footer e Main */}
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
