import YinYangSymbol from '@/public/yin-yang.svg'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className="flex items-center gap-1 font-bold lg:text-xl md:text-lg">
      <Link href="/">
        <YinYangSymbol className="w-5 h-5" />
      </Link>

      <Link href="/">E-Ching</Link>
    </div>
  )
}
