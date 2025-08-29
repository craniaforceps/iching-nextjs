'use client'

import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import HexagramDisplay from './HexagramDisplay'
import { HexagramObject } from '@/lib/types/hexagramTypes'

export default function ReadingDisplay() {
  const {
    question,
    setQuestion,
    notes,
    setNotes,
    hexagrams,
    error,
    handleGenerate,
    handleSave,
    setHexagrams,
  } = useHexagramDisplay()

  const [userMode, setUserMode] = useState<
    'stacked' | 'horizontal' | 'vertical'
  >('horizontal') // default LG

  const [mounted, setMounted] = useState(false)
  const [hasAttempted, setHasAttempted] = useState(false)

  useEffect(() => setMounted(true), [])

  // confirmar antes de sobrescrever leitura (Leitura button)
  const onGenerate = async () => {
    if (hexagrams) {
      const res = await Swal.fire({
        title: 'Já existe uma leitura',
        text: 'Gerar outra leitura irá sobrescrever a atual. Continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, gerar nova',
        cancelButtonText: 'Cancelar',
      })
      if (!res.isConfirmed) return
    }
    setHasAttempted(true)
    handleGenerate()
  }

  // BEFOREUNLOAD: native prompt se houver leitura (cobre botão refresh / fechar aba)
  useEffect(() => {
    if (!mounted) return
    if (!hexagrams) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // padrão para ativar prompt nativo
      e.preventDefault()
      // Chrome exige que atribuas returnValue
      e.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [mounted, hexagrams])

  // Interceptar teclas de refresh (F5, Ctrl+R / Cmd+R) para mostrar SweetAlert2
  useEffect(() => {
    if (!mounted) return
    if (!hexagrams) return

    const onKeyDown = (e: KeyboardEvent) => {
      const isF5 = e.key === 'F5'
      const isCtrlR =
        (e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')
      if (!isF5 && !isCtrlR) return

      e.preventDefault()
      e.stopPropagation()

      Swal.fire({
        title: 'Tem a certeza?',
        text: 'Tens uma leitura em progresso. Atualizar a página perderá a leitura atual.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, atualizar',
        cancelButtonText: 'Cancelar',
      }).then((res) => {
        if (res.isConfirmed) {
          // remover beforeunload temporariamente e forçar refresh
          window.removeEventListener('beforeunload', () => {})
          // permite o reload
          window.location.reload()
        }
      })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mounted, hexagrams])

  // Opcional: interceptar cliques em links <a> (interna/externa) e perguntar antes de navegar.
  // NOTA: isto evita navegação interna silenciosa; se confirmarem, navegamos com location.href (full load).
  const onDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (!hexagrams) return
      const a =
        (e.target as HTMLElement).closest &&
        (e.target as HTMLElement).closest('a')
      if (!a) return
      const href = (a as HTMLAnchorElement).href
      if (!href) return
      // ignora anchors com target=_blank
      if ((a as HTMLAnchorElement).target === '_blank') return
      // mesma origem: perguntar
      const sameOrigin = new URL(href).origin === window.location.origin
      if (!sameOrigin) return

      e.preventDefault()
      e.stopPropagation()

      Swal.fire({
        title: 'Sair da leitura?',
        text: 'Tens uma leitura por terminar. Queres mesmo navegar para outra página?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, navegar',
        cancelButtonText: 'Cancelar',
      }).then((res) => {
        if (res.isConfirmed) {
          // navegar como full page load (evita estado SPA)
          window.location.href = href
        }
      })
    },
    [hexagrams]
  )

  useEffect(() => {
    if (!mounted) return
    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [mounted, onDocumentClick])

  if (!mounted)
    return <div className="py-8 text-center text-gray-500">Carregando...</div>

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4">
      {/* Pergunta */}
      <div>
        <label htmlFor="question" className="sr-only">
          Pergunta
        </label>
        <input
          id="question"
          type="text"
          placeholder="Escreve a tua pergunta..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-center mt-2">
          <Button text="Leitura" type="button" onClick={onGenerate} />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Botões de modo (md+) */}
      {hexagrams && (
        <div className="hidden md:flex gap-4 justify-center mt-4">
          {['stacked', 'horizontal', 'vertical'].map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded transition-colors ${
                userMode === m
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setUserMode(m as typeof userMode)}
            >
              {m === 'stacked'
                ? 'Empilhado'
                : m === 'horizontal'
                  ? 'Horizontal'
                  : 'Vertical'}
            </button>
          ))}
        </div>
      )}

      {/* Display */}
      {hexagrams ? (
        <HexagramDisplay
          hexagrams={
            hexagrams as { match1: HexagramObject; match2: HexagramObject }
          }
          notes={notes}
          setNotes={setNotes}
          onSave={handleSave}
          layout={userMode}
        />
      ) : error ? (
        <div className="py-4 text-center text-sm text-red-600">
          Não foi possível gerar a leitura. Tenta novamente.
        </div>
      ) : null}
    </div>
  )
}
