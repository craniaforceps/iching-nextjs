import ReadingDisplay from '@/components/features/display/ReadingDisplay'
import Title from '@/components/ui/Title'

export default function LeituraPage() {
  return (
    <>
      <Title title="Leituras" />

      <div className="prose dark:prose-invert lg:max-w-3xl mx-auto text-justify">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
          itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          itaque tempore! Necessitatibus saepe aliquam similique doloribus sed
          nihil, nemo, facilis blanditiis eius iste, reiciendis velit
          voluptatem. Distinctio omnis iure laudantium.
        </p>
      </div>

      <div className="w-full">
        <ReadingDisplay />
      </div>
    </>
  )
}
