import ArchiveDisplay from '@/components/features/archive/ArchiveDisplay'
import Title from '@/components/ui/Title'

export default function ArquivoPage() {
  return (
    <main className="container px-6">
      <Title title="Arquivo" />
      <ArchiveDisplay />
    </main>
  )
}
