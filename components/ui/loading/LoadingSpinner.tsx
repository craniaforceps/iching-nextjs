'use client'

// Spinner de loading simples
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent border-b-transparent rounded-full animate-spin" />
    </div>
  )
}
