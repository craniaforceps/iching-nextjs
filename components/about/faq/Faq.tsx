'use client'

import { useState } from 'react'
import AccordionItem from '../../ui/AccordionItem'
import Image from 'next/image'

export default function Faq() {
  const faqs = [
    {
      question: 'O que é o I Ching?',
      answer: `O I Ching, ou Livro das Mutações, é um dos textos mais antigos da sabedoria chinesa.
      É usado tanto como ferramenta de autoconhecimento e reflexão como para consultas oraculares,
      ajudando a compreender o fluxo das mudanças na vida.`,
    },
    {
      question: 'Como funciona uma consulta do I Ching?',
      answer: `Tradicionalmente, uma consulta envolve formular uma pergunta e gerar um hexagrama
      (figura composta por seis linhas inteiras ou partidas). Cada linha representa um aspecto do momento presente
      e do movimento em curso. O texto associado ao hexagrama e às suas linhas fornece orientação simbólica,
      não previsões fixas.`,
    },
    {
      question: 'O I Ching “adivinha” o futuro?',
      answer: `Não exatamente. O I Ching não prevê o futuro, mas reflete o presente de forma profunda —
      mostrando padrões e tendências que podem conduzir a certos desfechos. É mais uma ferramenta de consciência
      do que de adivinhação.`,
    },
    {
      question: 'Como posso fazer uma leitura?',
      answer: `Existem vários métodos:
      - Moedas (lançar três moedas seis vezes)
      - Varetas de milefólio (método tradicional)
      - Métodos digitais (como o nosso site)
      O essencial é a intenção e a clareza da pergunta — o método é apenas o meio.`,
    },
    {
      question: 'Que tipo de perguntas posso fazer?',
      answer: `Perguntas sobre situações, decisões ou momentos de transição.
      Evita perguntas que impliquem sim/não ou datas fixas — o I Ching fala em movimentos e processos, não em certezas.`,
    },
    {
      question: 'O que é um hexagrama?',
      answer: `Um hexagrama é uma figura formada por seis linhas horizontais,
      cada uma inteira (Yang) ou partida (Yin). Há 64 combinações possíveis,
      e cada uma tem um nome, um significado e um comentário simbólico.`,
    },
    {
      question: 'O que são linhas mutantes?',
      answer: `Durante uma leitura, algumas linhas podem ser “mutantes” — indicando mudança em curso.
      Essas linhas mostram onde a transformação está a acontecer e geram um hexagrama secundário,
      que representa o estado futuro ou resultado do movimento.`,
    },
    {
      question: 'Preciso de acreditar para o I Ching funcionar?',
      answer: `Não. O I Ching não exige fé — apenas abertura e atenção.
      Mesmo abordado de forma racional, ele atua como um espelho simbólico,
      ajudando a ver as situações sob uma nova luz.`,
    },
    {
      question: 'O I Ching tem origem religiosa?',
      answer: `Não diretamente. É um texto que surgiu dentro do pensamento taoista e confucionista,
      mas o seu uso é filosófico, espiritual e psicológico, não dogmático.
      Hoje é estudado tanto por mestres espirituais como por psicólogos e filósofos.`,
    },
    {
      question: 'Posso usar o I Ching todos os dias?',
      answer: `Sim, se o fizeres com respeito e propósito.
      Muitos praticantes consultam o I Ching como prática diária de reflexão,
      semelhante à meditação ou journaling.`,
    },
    {
      question: 'Como interpretar as respostas?',
      answer: `Lê o texto do hexagrama e observa como ele se relaciona com a tua pergunta.
      O I Ching fala através de imagens e metáforas — o sentido surge da relação entre o símbolo e a tua situação.`,
    },
    {
      question: 'O que torna este site especial?',
      answer: `Este projeto oferece uma forma intuitiva e contemporânea de interagir com o I Ching —
      mantendo a profundidade do texto original, mas com ferramentas modernas para registar, refletir
      e acompanhar as tuas leituras ao longo do tempo.`,
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="">
      <h2 className="h2-title text-center mb-4">Perguntas e respostas</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-x-0  justify-center mx-auto w-full">
        {/* Coluna principal */}

        <div className="flex flex-col max-w-100 justify-center items-center mx-auto w-full">
          {/* <h2 className="h2-title text-center mb-4">
            Algumas questões frequentes:
          </h2> */}
          <div className="flex justify-center w-full">
            <div className="w-full space-y-4 text-left block ">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  title={faq.question}
                  isOpen={openIndex === index}
                  onToggle={() => toggleIndex(index)}
                >
                  <p className="text-sm leading-relaxed">{faq.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>

        {/* Imagem lateral */}
        <div className="w-80 flex mx-auto">
          <div className="relative w-full h-[650px] mx-auto flex justify-center items-center">
            <Image
              src="/images/svg/lady-png.svg"
              alt="Figura simbólica feminina — I Ching"
              priority
              fill
              className="object-contain w-full h-full p-0 hover:scale-105 transform transition-transform duration-300 dark:invert"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
