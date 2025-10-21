import Image from 'next/image'

export default function Dashboard() {
  return (
    <section className="main-split">
      <h2 className="h2-title">Bem-vindo ao E-Ching</h2>
      <p className="p-primary">
        Obrigado por te teres inscrito neste website, espero que possas fazer
        bom proveito do mesmo.
      </p>
      <p className="p-primary">
        Esta é a versão inicial e mais básica do E-Ching. Neste momento muita da
        informação ainda se encontra em inglês, mas um dos objectivos passa por
        fazer as traduções dos textos para português.
      </p>
      <p className="p-primary">As funcionalidades desta versão são:</p>
      <ul className="list-text space-y-3 text-left">
        <li>
          <strong>Leituras:</strong> Faz uma questão ao oráculo e clica no botão
          para gerares uma leitura e explorar os textos associados à mesma;
        </li>
        <li>
          <strong>Arquivo:</strong> Permite consultar, apagar e editar leituras
          antigas;
        </li>
        <li>
          <strong>Definições:</strong> Permite alterar algumas das configurações
          básicas da conta, como mudar a password, email ou apagar a conta;
        </li>
      </ul>
      <p className="p-primary">
        Como referido, esta é uma versão inicial, e espero nos próximos tempos
        implementar mais algumas coisas que me parecem úteis para o estudo do I
        Ching.
      </p>
      <div className="flex justify-center mx-auto mt-5">
        {' '}
        <Image
          src="/images/yin_yang_and_trigrams.gif"
          width={250}
          height={250}
          quality={75}
          alt="De acordo com a tradição, o I Ching remonta a cerca de 5000 anos atrás (2800–2737 a.C.), quando o lendário imperador Fu Xi (伏羲) teria descoberto os oito trigramas, Ba Gua (八卦) ao observar padrões na natureza"
          priority
          className="rounded-full border border-white w-[225px] h-auto m-2"
        />
      </div>

      <p className="p-caption text-center">
        Uma ilustração do Gujin Tushu Jicheng (1700-1725).
      </p>
    </section>
  )
}
