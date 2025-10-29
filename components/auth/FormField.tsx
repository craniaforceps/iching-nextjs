'use client'

type FormFieldProps = {
  id: string
  name?: string
  label: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  errors?: string[]
  maxLength?: number
}

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  errors = [],
  maxLength,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500  placeholder-opacity-50 break-smart"
      />
      {errors.map((msg, idx) => (
        <p key={idx} className="text-red-500 text-sm">
          {msg}
        </p>
      ))}
    </div>
  )
}
