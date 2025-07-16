import { simulateCoinToss } from './index'

// Function to generate a line
export const generateLine = (): number =>
  simulateCoinToss() + simulateCoinToss() + simulateCoinToss()
