type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text: string
}

export default function Button({ type, onClick, text }: ButtonProps) {
  return (
    <button
      type={type}
      className="text-sm p-2 border cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
