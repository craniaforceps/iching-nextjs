import ArchiveDisplay from '@/components/archive/ArchiveDisplay'

// Página do arquivo
export default function ArquivoPage() {
  return (
    <main className="main-dashboard">
      <div className="hidden md:block lg:block">
        <h2 className="h2-title">Arquivo</h2>
      </div>

      <ArchiveDisplay />
    </main>
  )
}
