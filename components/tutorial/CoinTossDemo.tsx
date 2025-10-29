'use client'
import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import { simulateCoinToss } from '@/lib/divinationMethods/coinMethodLogic'
import { useHexagram } from '@/hooks/useHexagram'
import CoinLinesTable from './CoinLinesTable'
import HexagramDisplayDemo from './HexagramDisplayDemo'

const getLineSymbol = (sum: number) => {
  switch (sum) {
    case 6:
      return '━━o━━'
    case 7:
      return '━━━━━'
    case 8:
      return '━━ ━━'
    case 9:
      return '━━x━━'
    default:
      return ''
  }
}

export default function CoinTossDemo() {
  const [lines, setLines] = useState<
    { tosses: number[]; sum: number; symbol: string }[]
  >([])
  const [hexagrams, setHexagrams] = useState<any | null>(null)
  const { generateHexagramFromLines, error } = useHexagram()

  const handleToss = () => {
    if (lines.length >= 6) return
    const tosses = [simulateCoinToss(), simulateCoinToss(), simulateCoinToss()]
    const sum = tosses.reduce((a, b) => a + b, 0)
    const symbol = getLineSymbol(sum)
    setLines([...lines, { tosses, sum, symbol }])
  }

  const handleReset = () => {
    setLines([])
    setHexagrams(null)
  }
  const handleGenerateHexagram = async () => {
    const lineValues = lines.map((l) => l.sum)
    try {
      setHexagrams(await generateHexagramFromLines(lineValues))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="w-full mx-auto p-1">
      <div className="flex justify-center gap-2 mb-4">
        <Button text="Lançar Linha" type="button" onClick={handleToss} />
        {lines.length > 0 && (
          <Button text="Reiniciar" type="button" onClick={handleReset} />
        )}
      </div>

      <CoinLinesTable lines={lines} />
      <HexagramDisplayDemo
        lines={lines}
        hexagrams={hexagrams}
        onGenerate={handleGenerateHexagram}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  )
}
