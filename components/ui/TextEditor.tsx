'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
}

export default function TextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Escreve as tuas notas…' }),
    ],
    content: value,
  })

  /* Sincroniza quando value externo muda */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  /* Envia alterações ao pai */
  useEffect(() => {
    if (!editor) return
    const handler = () => onChange(editor.getHTML())
    editor.on('update', handler)
    return () => editor.off('update', handler)
  }, [editor, onChange])

  return (
    <EditorContent
      editor={editor}
      className="min-h-[150px] w-full prose dark:prose-invert p-2 border rounded-md placeholder-gray-400"
    />
  )
}
