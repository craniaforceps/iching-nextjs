import { HexagramCellProps } from '@/lib/hexagram/hexagramTypes'
import React from 'react'

// A célula individual da tabela de hexagramas, com número, símbolo e nome em inglês
const HexagramCell: React.FC<HexagramCellProps> = ({
  number,
  symbol,
  englishName,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Classes base para o td, com transição e cursor
  const baseTdClasses =
    'cursor-pointer border border-gray-400 py-1 m-0 text-center align-top transition-colors duration-200'

  // Classes para número reduzido no mobile/sm e aumentado em md+
  const numberClasses = 'text-[6px]   font-semibold lg:text-[10px] pb-0 mb-0'

  // Classes para unicode (símbolo), menor no mobile, maior em md+
  const symbolClasses =
    'mt-1  sm:text-3xl md:text-4xl lg:text-4xl leading-none pb-1 px-0'

  // Classes para nome em inglês, escondido em sm, visível só em lg
  // const englishNameClasses =
  //   'italic mt-1 text-[7px] sm:text-[8px] hidden lg:inline lg:text-[12px]'

  // Define estilos para selected, hovered e default
  let tdClasses = baseTdClasses
  let bgColor = 'bg-transparent'
  let textColor = 'text-gray-900 dark:text-gray-100'
  let hoverBg = 'hover:bg-gray-900 dark:hover:bg-gray-100'
  let hoverText = 'hover:text-gray-100 dark:hover:text-gray-900'

  if (isSelected) {
    bgColor = 'bg-gray-900 dark:bg-gray-100'
    textColor = 'text-gray-100 dark:text-gray-900'
    hoverBg = 'hover:bg-gray-100 dark:hover:bg-gray-900'
    hoverText = 'hover:text-gray-900 dark:hover:text-gray-100'
  } else if (isHovered) {
    bgColor = 'bg-gray-100 dark:bg-gray-900'
    textColor = 'text-gray-900 dark:text-gray-100'
    hoverBg = 'hover:bg-gray-900 dark:hover:bg-gray-100'
    hoverText = 'hover:text-gray-100 dark:hover:text-gray-900'
  }

  tdClasses = `${baseTdClasses} ${bgColor} ${textColor} ${hoverBg} ${hoverText} p-0`

  return (
    <td
      className={tdClasses}
      onClick={() => onClick(number, symbol, englishName)}
      onMouseEnter={() => onMouseEnter(number, symbol, englishName)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex flex-col items-center justify-start h-full"
        tabIndex={0}
      >
        <span className={numberClasses}>{number}</span>
        <span className={symbolClasses}>{symbol}</span>
        {/* <span className={englishNameClasses}>{englishName}</span> */}
      </div>
    </td>
  )
}

export default HexagramCell
