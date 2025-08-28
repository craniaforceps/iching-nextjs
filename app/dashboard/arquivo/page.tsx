import ArchiveDisplay from '@/components/features/archive/ArchiveDisplay'
import Title from '@/components/ui/Title'

export default function ArquivoPage() {
  return (
    <>
      <Title title="Arquivo" />
      <div className="w-full max-w-[55rem] space-y-4 items-center justify-center mx-auto">
        <ArchiveDisplay />
      </div>
    </>
  )
}
