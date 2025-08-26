// hooks/useTextEditor.ts
'use client'

import { useEffect } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export function useTextEditor(value: string, onChange: (html: string) => void) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Escreve as tuas notas…' }),
    ],
    content: value,
  })

  // Atualiza conteúdo quando value externo muda
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  // Envia alterações para o pai
  useEffect(() => {
    if (!editor) return
    const handler = () => onChange(editor.getHTML())
    editor.on('update', handler)
    return () => {
      void editor.off('update', handler)
    }
  }, [editor, onChange])

  return editor
}
