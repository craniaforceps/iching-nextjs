import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  title: string
}
// O componente que mostra o botão de submissão do formulário de login

export function SubmitButton({ title }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-1.5 px-4 border hover:text-amber-500 border-stone-900 dark:border-white dark:bg-stone-900 bg-white text-stone-900 dark:text-gray-200 font-semibold rounded-lg transition disabled:opacity-50"
    >
      {pending ? 'A entrar...' : title}
    </button>
  )
}
