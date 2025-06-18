'use client'

import { useHexagram } from '@/hooks/useHexagram'

export default function HexagramDisplay() {
  const { hexagrams, error, generateHexagram } = useHexagram()

  return (
    <div className="w-2/3 mx-auto">
      <div className="grid grid-cols-1 place-items-center py-5">
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {hexagrams && !error && (
          <>
            <div className="mb-4 text-center">
              <h2 className="font-semibold ">Original</h2>
              <p>{hexagrams.match1.number}</p>
              <p>{hexagrams.match1.name}</p>
              <p className="text-9xl pb-5">{hexagrams.match1.unicode} </p>
              <p className="text-sm italic">{hexagrams.match1.info}</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="font-semibold">Mutante</h2>
              <p>{hexagrams.match2.number}</p>
              <p>{hexagrams.match2.name}</p>
              <p className="text-9xl pb-5">{hexagrams.match2.unicode} </p>
              <p className="text-sm italic">{hexagrams.match2.info}</p>
            </div>
          </>
        )}
        <button
          aria-label="Gerar uma nova leitura de hexagrama"
          className="text-sm p-2 border cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500"
          onClick={generateHexagram}
        >
          Leitura
        </button>
      </div>
    </div>
  )
}
