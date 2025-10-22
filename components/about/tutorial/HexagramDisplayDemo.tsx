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

  // ✅ DEBUG 1: mostra o estado completo de hexagrams
  console.log('DEBUG → Hexagrams received in HexagramDisplayDemo:', hexagrams)

  return (
    <>
      <div className="mt-4 text-center">
        <div className="font-mono text-base tracking-widest mb-3 border w-max mx-auto px-2">
          {lines.map((l) => l.sum).join('  ')}
        </div>
      </div>

      <div className="mt-2 text-center">
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
          <div className="flex justify-center mt-0">
            {[hexagrams.match1, hexagrams.match2].map((hex: any, i: number) => {
              // ✅ DEBUG 2: mostra o conteúdo de cada hexagrama individualmente
              console.log(`DEBUG → match${i + 1}:`, hex)

              // ✅ DEBUG 3: mostra apenas o unicode
              console.log(`DEBUG → unicode (match${i + 1}):`, hex?.unicode)

              return (
                <div key={i} className="p-4">
                  <p className="lg:text-9xl md:text-8xl text-8xl">
                    {hex.unicode}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
