import DashboardDisplay from '@/components/features/dashboard/DashboardDisplay'
import Title from '@/components/ui/Title'

export default async function DashboardPage() {
  return (
    <>
      <Title title="Dashboard" />
      <div className="flex justify-center w-full">
        <p className="prose dark:prose-invert mb-4 max-w-2xl w-full text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
          itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          itaque tempore! Necessitatibus saepe aliquam similique doloribus sed
          nihil, nemo, facilis blanditiis eius iste, reiciendis velit
          voluptatem. Distinctio omnis iure laudantium.
        </p>
      </div>
      <div className="">
        <DashboardDisplay />
      </div>
    </>
  )
}
