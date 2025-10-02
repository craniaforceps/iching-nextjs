import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const ui = {
  error: (msg: string) => toast.error(msg),
  success: (msg: string) => toast.success(msg),
  confirm: (opts: { title: string; text: string }) =>
    Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, guardar',
      cancelButtonText: 'Cancelar',
      ...opts,
    }),
}
