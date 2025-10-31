export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        ❌ Doação cancelada
      </h1>
      <p className="text-lg mb-4">
        Parece que decidiste não concluir a doação. Sem problemas! Podes tentar
        novamente quando quiseres.
      </p>
      <a
        href="/"
        className="mt-4 inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
      >
        Voltar ao início
      </a>
    </div>
  )
}
