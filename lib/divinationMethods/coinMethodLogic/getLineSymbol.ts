export const getLineSymbol = (sum: number) => {
  switch (sum) {
    case 6:
      return '━━o━━'
    case 7:
      return '━━━━━'
    case 8:
      return '━━ ━━'
    case 9:
      return '━━x━━'
    default:
      return ''
  }
}
