'use client'

import { useHexagram } from '@/hooks/useHexagram'
import Button from './Button'
import HexagramCard from './HexagramCard'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import Input from './Input'

const TextEditor = dynamic(() => import('@/components/ui/TextEditor'), {
  ssr: false,
})

export default function HexagramDisplay() {
  const { hexagrams, error, generateHexagram } = useHexagram()
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    generateHexagram()
    setTimeout(() => {
      buttonRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const match1 = hexagrams?.match1
  const match2 = hexagrams?.match2

  return (
    <div className="w-5/6 mx-auto not-prose">
      <div
        className="grid grid-cols-1 place-items-center py-5 text-sm w-full"
        ref={buttonRef}
      >
        <div className="mb-4">
          <Button text="Leitura" type="button" onClick={handleClick} />
        </div>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {match1 && match2 && !error && (
          <>
            <HexagramCard title="Original" hexagram={match1} />
            <HexagramCard title="Mutante" hexagram={match2} />
            <div className="py-5">
              <TextEditor />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
