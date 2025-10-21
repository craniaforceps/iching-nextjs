import YinYangSymbol from '@/public/yin-yang.svg'

export default function Logo() {
  return (
    <div className="font-bold text-lg flex items-center gap-1">
      <YinYangSymbol className="w-4 h-4 text-amber-500 top-[2px]" />I Ching
    </div>
  )
}
