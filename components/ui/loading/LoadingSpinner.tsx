'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#191919]">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent border-b-transparent rounded-full animate-spin" />
    </div>
  )
}
