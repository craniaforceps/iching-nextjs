'use client'

type FormContainerProps = {
  title: string
  children: React.ReactNode
}

export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <div className="w-full max-w-3xl border-1 bg-white dark:bg-stone-900 rounded-lg shadow-md p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {children}
    </div>
  )
}
