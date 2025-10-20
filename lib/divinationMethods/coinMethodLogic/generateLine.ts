import { simulateCoinToss } from './index'

// Gera uma linha do hexagrama somando o resultado de 3 lançamentos de moedas.
// O resultado será um número entre 6 e 9, conforme explicado em simulateCoinToss.ts.

export const generateLine = (): number =>
  simulateCoinToss() + simulateCoinToss() + simulateCoinToss()
