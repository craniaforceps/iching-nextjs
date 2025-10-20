// Este método é o das moedas e convém explicar previamente o seu funcionamento:
// Lança-se 3 moedas, cada uma com cara (3) ou coroa (2).
// Soma-se o valor das 3 moedas, obtendo-se um número entre 6 e 9.
// Esse número determina a linha do hexagrama:
// 6 - linha velha partida (mudança)
// 7 - linha nova inteira
// 8 - linha nova partida
// 9 - linha velha inteira (mudança)
// As linhas são lidas de baixo para cima, ou seja, a primeira linha lançada é a linha inferior do hexagrama.

// A função abaixo simula o lançamento de 3 moedas e retorna a soma dos valores.
// Retorna 2 (coroa) ou 3 (cara) para cada moeda, e a soma total será entre 6 e 9.
export const simulateCoinToss = (): number => (Math.random() < 0.5 ? 2 : 3)
