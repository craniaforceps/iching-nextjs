export function generateLine(): number {
  // 6 (old yin), 7 (young yang), 8 (young yin), 9 (old yang)
  const tosses = [coin(), coin(), coin()]
  const total = tosses.reduce((a, b) => a + b, 0)

  switch (total) {
    case 6:
      return 6
    case 7:
      return 7
    case 8:
      return 8
    case 9:
      return 9
    default:
      return 7
  }
}

function coin(): number {
  return Math.random() < 0.5 ? 2 : 3 // tails = 2, heads = 3
}

export function generateHexagram(): number[] {
  return Array.from({ length: 6 }, () => generateLine())
}
