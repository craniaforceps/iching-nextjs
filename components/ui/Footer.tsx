'use client'

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Chiquitim. Todos os direitos
        reservados.
      </div>
    </footer>
  )
}
