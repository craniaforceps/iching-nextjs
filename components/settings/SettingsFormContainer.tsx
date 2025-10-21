import { ReactNode } from 'react'

type SettingsFormContainerProps = {
  children: ReactNode
  error?: string
  success?: string
  title?: string
}

export default function SettingsFormContainer({
  children,
  error,
  success,
  title,
}: SettingsFormContainerProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm items-center justify-center mx-auto p-2">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      {children}
    </div>
  )
}
