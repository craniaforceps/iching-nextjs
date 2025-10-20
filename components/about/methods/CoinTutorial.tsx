export default function CoinTutorial() {
  return (
    <div className="tutorial-container">
      <ol className="tutorial-list">
        <li className=" mt-0 pt-0 ">
          {' '}
          Fazer seis lançamentos com três moedas, cada lançamento corresponde a
          uma linha.
        </li>{' '}
        <li>
          {' '}
          As moedas têm de ter duas faces distintas, onde cara corresponde a 3
          (yang) e coroa a 2 (yin)
        </li>{' '}
        <li>
          {' '}
          Os hexagramas são feitos de baixo para cima, pelo que o primeiro
          lançamento corresponde à linha de baixo.
        </li>{' '}
        <li>
          {' '}
          Converter cada resultado na linha correspondente (seguindo a tabela de
          cima).
        </li>{' '}
        <li>
          {' '}
          Por fim, avaliar as linhas (ter em atenção as mutáveis) e desenhar os
          hexagramas{' '}
        </li>{' '}
      </ol>
    </div>
  )
}
