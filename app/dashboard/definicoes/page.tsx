import SettingsDisplay from '@/components/settings/SettingsDisplay'

// Página de definições
export default function DefinicoesPage() {
  return (
    <main className="main-dashboard">
      <div className="hidden md:block lg:block">
        <h2 className="h2-title">Definições</h2>
      </div>

      <div className="w-full">
        <SettingsDisplay />
      </div>
    </main>
  )
}
