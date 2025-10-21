// components/AppContent/AppLayout.tsx
import AppLayoutServer from './AppLayoutServer'
import AppContentClient from './AppContentClient'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayoutServer>
      <AppContentClient>{children}</AppContentClient>
    </AppLayoutServer>
  )
}
