type SettingsFieldProps = {
  name: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  textarea?: boolean
  required?: boolean
}

export default function SettingsField({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  textarea = false,
  required = false,
}: SettingsFieldProps) {
  if (textarea) {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border p-2 rounded w-full"
      />
    )
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border p-2 rounded w-full"
    />
  )
}
