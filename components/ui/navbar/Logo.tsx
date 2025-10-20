import YinYangSymbol from '@/public/yin-yang.svg'

export default function Logo() {
  return (
    <div className="flex items-center gap-1 font-bold lg:text-xl md:text-lg">
      <YinYangSymbol className="w-5 h-5 text-amber-500" />
      E-Ching
    </div>
  )
}
