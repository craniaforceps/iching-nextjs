'use client'

import { useAuth } from '@/context/AuthProvider'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppContentClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading: authLoading } = useAuth()

  if (authLoading) return <LoadingSpinner />

  return (
    <>
      {children}
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
