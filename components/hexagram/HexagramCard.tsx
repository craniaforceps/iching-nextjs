'use client'

import HexagramDetails from './HexagramDetails'
import HexagramLines from './HexagramLines'
import type { HexagramCardProps } from '@/lib/hexagram/hexagramTypes'

export default function HexagramCard({ title, hexagram }: HexagramCardProps) {
  if (!hexagram) {
    return <p className="text-center italic text-gray-500">No data.</p>
  }

  const { number, name, unicode, details } = hexagram
  const { image = [], judgment = [], lines = [] } = details ?? {}

  return (
    <div className="mb-4 w-full">
      <h2 className="font-semibold md:text-base text-center">{title}</h2>
      <p className="text-center">
        {number}. {name}
      </p>
      <p className="text-8xl md:text-9xl pb-5 text-center">{unicode}</p>

      <HexagramDetails
        hexagramId={number}
        title="Judgment"
        content={judgment}
      />
      <HexagramDetails hexagramId={number} title="Image" content={image} />

      <HexagramLines lines={lines} />
    </div>
  )
}
