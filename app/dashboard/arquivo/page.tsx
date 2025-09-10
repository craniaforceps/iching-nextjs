import ArchiveDisplay from '@/components/features/archive/ArchiveDisplay'
import Title from '@/components/ui/Title'

export default function ArquivoPage() {
  return (
    <div className="lg:py-2 py-4">
      <Title title="Arquivo" />
      <div className="w-full  max-w-3xl space-y-4 items-center justify-center mx-auto">
        <ArchiveDisplay />
      </div>
    </div>
  )
}
