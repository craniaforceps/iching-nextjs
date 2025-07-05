import Button from '@/components/ui/Button'
import Title from '@/components/ui/Title'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex justify-center  prose dark:prose-invert p-6">
      <div className="w-full max-w-3xl  ">
        <Title title="Bem-vindos ao nosso oráculo" />
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
          O <strong>I Ching</strong>, ou livro das mutações, é um dos mais
          antigos sistemas de divinição do mundo. Por milénios, tem sido
          consultado por aqueles que buscam compreender melhor o fluxo que rege
          as nossas vidas.
        </p>
        <p className="text-lg text-justify">
          Aqui oferecemos um espaço onde poderás reflectir e meditar com a ajuda
          do I Ching.
        </p>

        <div>
          <h2>Como usar o I Ching?</h2>
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
