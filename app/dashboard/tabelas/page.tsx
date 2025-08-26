import HexagramReferenceTable from '@/components/features/tables/HexagramReferenceTable'
import HexagramListTable from '@/components/features/tables/HexagramListTable'

import Title from '@/components/ui/Title'

const TabelasPage = () => {
  return (
    <div className="w-full">
      <Title title="Tabelas" />
      <HexagramListTable />
      <HexagramReferenceTable />
    </div>
  )
}
export default TabelasPage
