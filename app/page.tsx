import HexagramDisplay from '@/components/ui/HexagramDisplay'

export default function Home() {
  return (
    <main className="flex justify-center py-2">
      <div className="w-full max-w-3xl text-center p-6">
        <h1 className="text-3xl font-bold mb-6">I Ching</h1>
        <HexagramDisplay />
      </div>
    </main>
  )
}
