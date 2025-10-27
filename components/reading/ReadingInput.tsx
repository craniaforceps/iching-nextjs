import Button from '@/components/ui/button/Button'

type ReadingInputProps = {
  question: string
  setQuestion: (q: string) => void
  onGenerate: () => void
  isGenerating: boolean
  error?: string
  maxLength?: number
}

export default function ReadingInput({
  question,
  setQuestion,
  isGenerating,
  onGenerate,
  error,
  maxLength = 100,
}: ReadingInputProps) {
  return (
    <div className="items-center flex flex-col w-full">
      <label htmlFor="question" className="sr-only">
        Pergunta
      </label>
      <input
        id="question"
        type="text"
        placeholder="Escreve a tua pergunta..."
        maxLength={maxLength}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full lg:max-w-3xl border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {/* Contador de caracteres */}
      <div className="w-full lg:max-w-3xl text-right text-sm text-gray-500 mt-1">
        {question.length} / {maxLength}
      </div>
      <div className="flex justify-center mt-2">
        <Button
          text="Leitura"
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
