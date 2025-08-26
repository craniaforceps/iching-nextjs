import DashboardDisplay from '@/components/features/dashboard/DashboardDisplay'
import Title from '@/components/ui/Title'

export default async function DashboardPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <Title title="Dashboard" />
      <p className="text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
        quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
        itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
        itaque tempore! Necessitatibus saepe aliquam similique doloribus sed
        nihil, nemo, facilis blanditiis eius iste, reiciendis velit voluptatem.
        Distinctio omnis iure laudantium.
      </p>
      <DashboardDisplay />
    </div>
  )
}
