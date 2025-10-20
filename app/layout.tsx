import './globals.css'
import { AuthProvider } from '@/context/AuthProvider'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import ThemeProvider from './theme/theme-provider'
import AppContent from './AppContent'
import { getCurrentUser } from '@/lib/auth/session'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <body className="bg-white dark:bg-stone-900 text-stone-900 dark:text-gray-200 transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialUser={initialUser}>
            {/* AppContent mantém header, footer e main */}
            <AppContent>{children}</AppContent>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
