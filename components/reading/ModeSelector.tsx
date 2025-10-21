type ModeSelectorProps = {
  userMode: 'stacked' | 'horizontal' | 'vertical'
  setUserMode: (mode: 'stacked' | 'horizontal' | 'vertical') => void
}

export default function ModeSelector({
  userMode,
  setUserMode,
}: ModeSelectorProps) {
  return (
    <div className="hidden md:flex gap-2 justify-center mb-4">
      {(['stacked', 'horizontal', 'vertical'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          className={`cursor-pointer px-3 py-1 text-xs border rounded ${
            userMode === mode
              ? 'dark:bg-white dark:text-black bg-black text-white'
              : 'text-black dark:text-white'
          } hover:bg-amber-400`}
          onClick={() => setUserMode(mode)}
        >
          {mode === 'stacked'
            ? 'Empilhado'
            : mode === 'horizontal'
              ? 'Horizontal'
              : 'Vertical'}
        </button>
      ))}
    </div>
  )
}
