import Header from '@/components/ui/navbar/Header'
import Footer from '@/components/ui/Footer'

export default function AppLayoutServer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header /> {/* Server Component */}
      <main className="flex-1 mt-10 px-4">{children}</main>{' '}
      {/* flex-1 preenche espaço restante */}
      <Footer /> {/* Server Component */}
    </>
  )
}
