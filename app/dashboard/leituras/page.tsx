import HexagramDisplay from '@/components/features/display/HexagramDisplay'
import Title from '@/components/ui/Title'

export default function LeituraPage() {
  return (
    <main className="">
      <div className="text-justify ">
        <Title title="Leituras" />
        <p className="text-justify prose dark:prose-invert">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
          itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          itaque tempore! Necessitatibus saepe aliquam similique doloribus sed
          nihil, nemo, facilis blanditiis eius iste, reiciendis velit
          voluptatem. Distinctio omnis iure laudantium.
        </p>
        <div className="">
          <HexagramDisplay />
        </div>
      </div>
    </main>
  )
}
