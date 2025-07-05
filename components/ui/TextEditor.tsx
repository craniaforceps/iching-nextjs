'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Button from './Button'
import { useState } from 'react'

export default function TextEditor() {
  const [inputValue, setInputValue] = useState('')
  const [submittedHtml, setSubmittedHtml] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Escreve aqui…</p>',
    immediatelyRender: false,
    placeholder: 'escreve aqui',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editor) return

    const html = editor.getHTML()
    const question = inputValue

    setSubmittedHtml(html)

    console.log('Pergunta:', question)
    console.log('Conteúdo:', html)

    // Aqui podes enviar ambos para uma API, por exemplo:
    // await fetch('/api/guardar', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ question, content: html }),
    // })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <input
        type="text"
        placeholder="Escreve a tua pergunta..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border rounded-md px-3 py-2 placeholder-gray-400"
      />

      <EditorContent
        editor={editor}
        className="min-h-[150px] md:min-w-[400px] w-full prose dark:prose-invert p-2 border rounded-md placeholder-gray-400"
      />

      <div className="text-center">
        <Button type="submit" text="Guardar" />
      </div>
    </form>
  )
}
