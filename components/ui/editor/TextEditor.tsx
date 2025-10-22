// components/ui/editor/TextEditor.tsx
'use client'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TextEditor({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? 'Escreve as tuas notas…'}
      className="min-h-[200px] w-full min-w-[100px] max-w-[1000px] py-2 px-3 border rounded-md placeholder-gray-400 resize-none"
    />
  )
}
