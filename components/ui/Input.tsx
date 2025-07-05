import React from 'react'

type InputProps = {
  label?: string
  type?: string
  name: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 ${className}`}
      />
    </div>
  )
}

export default Input
