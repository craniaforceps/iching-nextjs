'use client'

import { useAuth } from '@/context/AuthProvider'
import Header from '@/components/ui/navbar/Header'
import Footer from '@/components/ui/Footer'
import React from 'react'
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner'

export default function AppContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return (
    <>
      <Header />
      <main className="mt-10 min-h-screen px-4">{children}</main>
      <Footer />
    </>
  )
}
