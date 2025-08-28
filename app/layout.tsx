import './globals.css'
import { ToastProvider } from './providers/toast-provider'
import { AuthProvider } from '@/context/AuthProvider'
import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import ThemeProvider from './theme/theme-provider'
import Header from '@/components/ui/navbar/Header'
import Footer from '@/components/ui/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'I Ching',
  description: 'Um website para consulta e divinação com I Ching',
  keywords: 'Hexagramas, I Ching, Filosofia Chinesa',
  icons: {
    icon: '/yin-yang.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ToastProvider />
            <Header />
            <main className="mt-10 min-h-screen px-4">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
