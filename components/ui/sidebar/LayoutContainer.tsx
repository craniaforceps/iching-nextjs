import { ReactNode } from 'react'

interface LayoutContainerProps {
  children: ReactNode
}

export default function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto transition-colors relative flex flex-col md:flex-row gap-4 min-h-screen">
      {children}
    </div>
  )
}
