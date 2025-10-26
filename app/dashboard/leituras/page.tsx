import Reading from '@/components/reading/Reading'

export default function LeituraPage() {
  return (
    <main className="main-dashboard">
      <div className="hidden md:block lg:block">
        <h2 className="h2-title">Leituras</h2>
      </div>
      <Reading />
    </main>
  )
}
