export default function YarrowStalkTutorial() {
  return (
    <main className="tutorial-container">
      <ol className="tutorial-list">
        <li>
          Remove um dos cinquenta talos e coloca-o à tua frente, numa direção
          paralela ao teu corpo. Este é o <em>talo observador</em>, e não será
          utilizado novamente.
        </li>{' '}
        <li>
          {' '}
          Divide aleatoriamente os 49 talos restantes em duas pilhas,
          colocando-as lado a lado, numa direção perpendicular ao teu
          corpo.{' '}
        </li>{' '}
        <li>
          {' '}
          Retira um talo da pilha da direita e coloca-o entre o dedo mindinho e
          o anelar da mão esquerda. Este é o segundo talo.{' '}
        </li>{' '}
        <li>
          {' '}
          Com a tua mão esquerda, recolhe os talos que restam na pilha da
          esquerda.{' '}
        </li>{' '}
        <li>
          {' '}
          Remove grupos de quatro talos de cada vez da mão esquerda,
          colocando-os na mesa em pequenas pilhas separadas. Este processo
          termina quando restarem quatro ou menos talos. Coloca então esses
          talos restantes entre o anelar e o dedo médio da mão esquerda.{' '}
        </li>{' '}
        <li>
          {' '}
          Agora, pega na pilha da direita e faz o mesmo processo, retirando
          grupos de quatro talos de cada vez e colocando o resto entre os dedos
          seguintes.{' '}
        </li>{' '}
        <li>
          {' '}
          Conta os talos que estás a segurar com a mão esquerda. O primeiro
          total será 5 ou 9 (as combinações possíveis são 1 + 4 + 4, 1 + 3 + 1,
          1 + 2 + 2, ou 1 + 1 + 3).{' '}
        </li>{' '}
        <li>
          {' '}
          Separa esses talos contados e junta os não contados numa nova pilha.
          Repete o processo anterior para obter um segundo total, que será 4 ou
          8 (1 + 4 + 3, 1 + 3 + 4, 1 + 1 + 2, ou 1 + 2 + 1). Tal como antes,
          estes talos são postos de parte.{' '}
        </li>{' '}
        <li>
          {' '}
          Repete o procedimento uma última vez para obter um terceiro conjunto
          de 4 ou 8 talos. Deverás agora ter três conjuntos contados, cada um
          com 4/5 ou 8/9 talos.{' '}
        </li>{' '}
        <li>
          {' '}
          Os talos contados estão agrupados em conjuntos de 4/5 ou 8/9. Para
          cada grupo de 8 ou 9, conta 2; para cada grupo de 4 ou 5, conta 3.
          Este número final corresponde ao valor da linha do hexagrama.{' '}
        </li>{' '}
      </ol>
    </main>
  )
}
