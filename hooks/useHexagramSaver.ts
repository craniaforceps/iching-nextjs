import { toast } from 'react-toastify'
import { ui } from '@/lib/ui/alerts'
import { useRouter } from 'next/navigation'
import type { BinaryMatchOutput } from '@/lib/hexagram/hexagramTypes'
import { getCurrentUser } from '@/lib/auth/session'

interface UseHexagramSaverProps {
  hexagrams: BinaryMatchOutput | null
  question: string
  notes: string
}

export function useHexagramSaver({
  hexagrams,
  question,
  notes,
}: UseHexagramSaverProps) {
  const router = useRouter()

  const handleSave = async () => {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    const user = await getCurrentUser()

    // 🔹 Caso não loggado, mostra modal
    if (!user?.id) {
      const { default: Swal } = await import('sweetalert2')
      const result = await Swal.fire({
        title: 'Não estás logado',
        text: 'Para guardar leituras precisas criar conta ou iniciar sessão.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Criar conta',
        cancelButtonText: 'Cancelar',
      })
      if (result.isConfirmed) router.push('/registo')
      return
    }

    try {
      const res = await ui.confirm({
        title: 'Guardar leitura?',
        text: 'Desejas realmente guardar esta leitura?',
      })
      if (!res.isConfirmed) return

      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          notes,
          originalBinary: hexagrams.match1.binary,
          mutantBinary: hexagrams.match2.binary,
        }),
      })

      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`)

      toast.success('Leitura guardada com sucesso!')
      router.push('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      toast.error('Erro ao guardar: ' + message)
      console.error('Erro ao guardar leitura:', err)
    }
  }

  return { handleSave }
}
