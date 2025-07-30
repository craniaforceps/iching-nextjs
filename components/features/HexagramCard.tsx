'use client'

import HexagramDetails from './HexagramDetails'
import type { HexagramCardProps } from '@/lib/types/hexagram'

export default function HexagramCard({ title, hexagram }: HexagramCardProps) {
  if (!hexagram) {
    return (
      <p className="text-center italic text-gray-500">
        Hexagram data not found.
      </p>
    )
  }

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
        content={lines.map((textArr, i) => [`Line ${i + 1}`, ...textArr])}
      />
    </div>
  )
}
