interface PaginationControlProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

// O controlo de paginação com botões para navegar entre páginas
export default function PaginationControl({
  page,
  totalPages,
  setPage,
}: PaginationControlProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="cursor-pointer px-3 py-1 rounded dark:bg-white dark:text-black bg-black text-white disabled:opacity-50 disabled:cursor-default"
      >
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="cursor-pointer px-3 py-1 rounded dark:bg-white dark:text-black bg-black text-white disabled:opacity-50 disabled:cursor-default"
      >
        Seguinte
      </button>
    </div>
  )
}
