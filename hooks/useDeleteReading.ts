import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export function useDeleteReading(onDelete: (id: number | number) => void) {
  return async function deleteReading(readingId: number | number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Quer mesmo apagar esta leitura? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
    })
    if (!isConfirmed) return

    const res = await fetch(`/api/readings/${readingId}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Leitura apagada com sucesso!')
      onDelete(readingId)
    } else toast.error('Erro ao apagar leitura.')
  }
}
