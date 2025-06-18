import { generateLine } from './generateLine'

export const generateRawHexagram = (): number[] => {
  const hexagramRaw: number[] = []

  for (let i = 0; i < 6; i++) {
    hexagramRaw.unshift(generateLine())
  }
  console.log('Hexagram: ', hexagramRaw) //DEBUG
  return hexagramRaw
}
