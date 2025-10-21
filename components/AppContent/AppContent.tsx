// AppContent.tsx
'use client'

import { useAuth } from '@/context/AuthProvider'
import Header from '@/components/ui/navbar/Header'
import Footer from '@/components/ui/Footer'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading: authLoading } = useAuth()

  if (authLoading) return <LoadingSpinner />

  return (
    <>
      <Header />
      <main className="mt-10 min-h-screen px-4">{children}</main>
      <Footer />
      {/* ToastContainer montado apenas uma vez */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
