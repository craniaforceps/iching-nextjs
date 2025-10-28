import { forwardRef } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text: string
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', onClick, text, disabled }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className="text-xs lg:text-xs p-2 border cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500 w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
)

Button.displayName = 'Button' // Importante para debug e React DevTools

export default Button
