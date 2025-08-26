import Button from '@/components/ui/button/Button'
import Title from '@/components/ui/Title'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full max-w-5xl mx-auto p-6 prose dark:prose-invert">
      <div className=" ">
        <Title title="Vem descobrir o I Ching connosco" />
        <Image
          src="/images/chinese-mountains.webp"
          width={1920}
          height={1280}
          alt="Imagem de montanhas chinesas numa paisagem com neblina e árvores"
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="border rounded"
        />

        <p className="text-lg text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic minus
          quisquam molestias molestiae facilis, corporis temporibus, dignissimos
          quae, iure quod sed tempora soluta eius omnis fugiat tenetur ut id
          sint?
        </p>
        <p className="text-lg text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic minus
          quisquam molestias molestiae facilis, corporis temporibus, dignissimos
          quae, iure quod sed tempora soluta eius omnis fugiat tenetur ut id
          sint?
        </p>

        <div>
          <h2>Instruções básicas sobre o I Ching</h2>
          <ol className="space-y-2 text-lg">
            <li>Formula a tua questão</li>
            <li>Segue as instruções</li>
            <li>Faz a tua interpretação</li>
          </ol>
        </div>
        <div className="text-center">
          <Link href="/leituras">
            <Button text="Experimenta!" />
          </Link>
        </div>
      </div>
    </main>
  )
}
