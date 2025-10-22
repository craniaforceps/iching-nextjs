import { useState } from 'react'

export function useTextEditor(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  return { value, setValue }
}
