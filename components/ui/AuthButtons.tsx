import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

function AuthButtons() {
  return (
    <>
      {/* Mobile: só ícones */}
      <div className="flex gap-2">
        <Link
          href="/login"
          aria-label="Entrar"
          className="p-1 rounded hover:bg-amber-500 hover:text-white transition"
        >
          <LogIn size={15} />
        </Link>
        <Link
          href="/register"
          aria-label="Registar"
          className="p-1 rounded hover:bg-amber-500 hover:text-white transition"
        >
          <UserPlus size={15} />
        </Link>
      </div>
    </>
  )
}

export default AuthButtons
