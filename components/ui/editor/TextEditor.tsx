// components/ui/editor/TextEditor.tsx
'use client'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
}

// Editor de texto simples com contagem de caracteres (limite atual de 8000 chars)
export default function TextEditor({
  value,
  onChange,
  placeholder,
  maxLength = 8000,
}: Props) {
  return (
    <>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value)
          }
        }}
        placeholder={placeholder ?? 'Escreve as tuas notas…'}
        className="min-h-[200px] w-full min-w-[100px] max-w-[1000px] py-2 px-3 border rounded-md placeholder-gray-400 resize-none"
      />
      <div className="mt-0.5 pr-1.5 text-sm text-gray-500 text-right">
        {value.length} / {maxLength}
      </div>
    </>
  )
}
