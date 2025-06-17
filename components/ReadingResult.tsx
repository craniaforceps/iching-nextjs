type ReadingResultProps = {
  original: number
  changing?: number
}

export default function ReadingResult({
  original,
  changing,
}: ReadingResultProps) {
  return (
    <div>
      <h2>Reading Result</h2>
      <p>Original Hexagram: {original}</p>
      {changing && <p>Changing Hexagram: {changing}</p>}
    </div>
  )
}
