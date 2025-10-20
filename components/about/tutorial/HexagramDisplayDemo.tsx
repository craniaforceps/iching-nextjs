'use client'

import Button from '@/components/ui/button/Button'

type HexagramDisplayProps = {
  lines: { sum: number; symbol: string }[]
  hexagrams: any | null
  onGenerate?: () => void
}

export default function HexagramDisplayDemo({
  lines,
  hexagrams,
  onGenerate,
}: HexagramDisplayProps) {
  if (lines.length !== 6) return null

  return (
    <>
      <div className="mt-4 text-center">
        <p className="text-sm mb-2 font-semibold underline">
          Sequência de somas:
        </p>
        <div className="font-mono text-base tracking-widest mb-3 border w-max mx-auto px-2">
          {lines.map((l) => l.sum).join('  ')}
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm mb-2 font-semibold underline">Hexagrama base:</p>
        <pre className="p-0 m-0 font-mono text-lg leading-[1.15] tracking-tight whitespace-pre text-center bg-transparent dark:text-white text-black mt-0">
          {lines
            .slice()
            .reverse()
            .map((l) => l.symbol)
            .join('\n')}
        </pre>
        {!hexagrams && onGenerate && (
          <Button text="Gerar hexagrama" type="button" onClick={onGenerate} />
        )}
      </div>

      {hexagrams && (
        <div className="mt-4 text-center">
          <p className="text-sm mb-0 pb-0 font-semibold underline">
            Hexagramas gerados:
          </p>
          <div className="flex justify-center mt-0">
            {[hexagrams.match1, hexagrams.match2].map((hex: any, i: number) => (
              <div key={i} className="p-4">
                <p className="lg:text-9xl md:text-8xl text-8xl">
                  {hex.unicode}
                </p>
                <p className="text-xs">{hex.number}</p>
                <p className="text-xs">{hex.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
