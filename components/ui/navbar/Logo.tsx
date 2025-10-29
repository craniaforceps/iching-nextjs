import YinYangSymbol from '@/public/yin-yang.svg'
import Link from 'next/link'
import SequentialHexagram from '../exp/SequentialHexagram'

export default function Logo() {
  return (
    <div className="flex items-center gap-1 font-bold lg:text-xl md:text-lg ">
      <div className="pb-0.5">
        <Link href="/">
          <SequentialHexagram />
        </Link>
      </div>
      <p>
        <Link href="/">E-Ching</Link>
      </p>
    </div>
  )
}
