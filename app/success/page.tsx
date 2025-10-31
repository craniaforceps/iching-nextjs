export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🌟 Obrigado pela tua doação!
      </h1>
      <p className="text-lg mb-4">
        A tua contribuição ajuda a manter o projeto I Ching vivo e acessível.
      </p>
      <a
        href="/"
        className="mt-4 inline-block bg-amber-600 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
      >
        Voltar ao início
      </a>
    </div>
  )
}
