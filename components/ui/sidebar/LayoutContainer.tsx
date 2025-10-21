import { ReactNode } from 'react'

type LayoutContainerProps = {
  children: ReactNode
}

// LayoutContainer montado apenas uma vez

export default function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto transition-colors relative flex flex-col md:flex-row gap-4 min-h-screen">
      {children}
    </div>
  )
}
