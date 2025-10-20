import { generateLine } from './generateLine'

// Gera um hexagrama bruto, que é uma lista de 6 números representando as linhas do hexagrama.
// Cada número é entre 6 e 9, conforme explicado em generateLine.ts.
// As linhas são armazenadas em ordem do fundo para o topo (a primeira linha é a inferior).
export const generateRawHexagram = (): number[] => {
  const hexagramRaw: number[] = []

  for (let i = 0; i < 6; i++) {
    hexagramRaw.push(generateLine())
  }
  console.log('Hexagram: ', hexagramRaw) //DEBUG
  return hexagramRaw
}
