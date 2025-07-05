'use client'

import HexagramDetails from './HexagramDetails'

type HexagramLine = {
  position: number
  text: string[]
}

type HexagramDetailsType = {
  image: string[]
  judgment: string[]
  lines: HexagramLine[]
}

export type Hexagram = {
  number: number
  name: string
  unicode: string
  info: string
  details?: HexagramDetailsType
}

type HexagramCardProps = {
  title: string
  hexagram: Hexagram
}

export default function HexagramCard({ title, hexagram }: HexagramCardProps) {
  const { number, name, unicode, info, details } = hexagram
  const { image = [], judgment = [], lines = [] } = details ?? {}

  return (
    <div className="mb-4 text-center w-full">
      <h2 className="font-semibold md:text-base">{title}</h2>
      <p className="md:text-lg">
        {number}. {name}
      </p>
      <p className="md:text-9xl text-8xl pb-5">{unicode}</p>
      <p className="md:text-base text-sm italic mb-3">{info}</p>

      <HexagramDetails
        hexagramId={number}
        title="Judgment"
        content={judgment}
      />
      <HexagramDetails hexagramId={number} title="Image" content={image} />
      <HexagramDetails
        hexagramId={number}
        title="Lines"
        content={lines.map((line) => [`Line ${line.position}`, ...line.text])}
      />
    </div>
  )
}
