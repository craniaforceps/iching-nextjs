// components/TextEditor.tsx
'use client'

import { EditorContent } from '@tiptap/react'
import { useTextEditor } from '@/hooks/useTextEditor'

type Props = {
  value: string
  onChange: (html: string) => void
}

export default function TextEditor({ value, onChange }: Props) {
  const editor = useTextEditor(value, onChange)

  return (
    <EditorContent
      editor={editor}
      className="min-h-[150px] w-full prose dark:prose-invert p-2 border rounded-md placeholder-gray-400"
    />
  )
}
