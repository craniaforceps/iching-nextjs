'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ui } from '@/lib/ui/alerts'
import { saveReading } from '@/services/readings'
import type { BinaryMatchOutput } from '@/lib/types/hexagramTypes'

export function useHexagramSaver({
  hexagrams,
  question,
  notes,
}: {
  hexagrams: BinaryMatchOutput | null
  question: string
  notes: string
}) {
  const router = useRouter()

  const handleSave = async () => {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    const res = await ui.confirm({
      title: 'Guardar leitura?',
      text: 'Desejas realmente guardar esta leitura?',
    })
    if (!res.isConfirmed) return

    try {
      await saveReading({
        question,
        notes,
        originalBinary: hexagrams.match1.binary,
        mutantBinary: hexagrams.match2.binary,
      })

      toast.success('Leitura guardada com sucesso!')
      router.push('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      toast.error('Erro ao guardar: ' + message)
    }
  }

  return { handleSave }
}
