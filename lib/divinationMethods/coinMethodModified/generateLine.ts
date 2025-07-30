import { simulateCoinToss } from '../coinMethodLogic/client'

// No método modificado são lançadas duas moedas ficando uma de parte (Cara=3 e Coroa=2)
// Caso saia pelo menos uma Cara (3+3=6 ou 3+2=5) - deixamos uma cara e fazemos dois novos lançamentos
// Caso saiam duas coroas (2+2=4) - deixamos uma coroa e fazemos dois novos lançamentos

// Function to generate a line
export const firstThrow = (): number => simulateCoinToss() + simulateCoinToss()

export const generateLine = (): number => {
  const throwResult = firstThrow()

  if (throwResult == 5 || throwResult == 6) {
    return 3 + simulateCoinToss() + simulateCoinToss()
  } else {
    //(throwResult == 4)
    return 2 + simulateCoinToss() + simulateCoinToss()
  }
}
