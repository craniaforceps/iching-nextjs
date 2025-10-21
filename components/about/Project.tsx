'use client'
import Image from 'next/image'
import RandomHexagramSequential from '../ui/exp/SequentialHexagram'
import AnimatedHexagrams from '../ui/exp/Experimento'

export default function Project() {
  return (
    <section className="main-section">
      <div className="content-split">
        <div className="content-main">
          <h2 className="h2-title">E-Ching - Website das Mutações</h2>
          <h3 className="h3-title">Objectivos</h3>
          <p className="p-primary">
            O meu interesse pelo I Ching começou há mais de dez anos, após
            ter-me aprofundado em conceitos da filosofia chinesa como o Yin Yang
            e o Tao. Durante o ano de 2025, decidi aprender web developing após
            ter ganhado algumas noções de JavaScript e React. Quando comecei a
            pensar num possível projecto de portfólio em que pudesse fazer uma
            ferramenta que realmente me fosse útil enquanto mostrava os meus
            conhecimentos de programaçao, esta ferramenta para consulta e estudo
            do I Ching e dos seus hexagramas pareceu-me ideal.
          </p>
          <p className="p-primary">
            Neste sentido, o principal objectivo deste projecto é dar aos
            utilizadores algumas funcionalidades que, no meu entender, podem
            melhorar e tornar mais eficiente a consulta e a própria aprendizagem
            do I Ching. De certo modo, o objectivo também se acaba por estender
            para consciencializar um eventual público, em particular o lusófono,
            para as qualidades desta filosofia milenar.
          </p>
          <h3 className="h3-title">Abordagem técnica</h3>
          <p className="p-primary">
            No passado já tinha feito alguns pequenos protótipos de geração de
            hexagramas de I Ching em React, mas desta vez tentei fazê-lo em Next
            JS de modo a ambientar-me a esta framework. Fundamentalmente este
            projecto usa:
          </p>
          <ul className="list-disc list-inside pl-5 p-primary">
            <li>
              <b>Next JS 15</b> - uma framework de React;
            </li>
            <li>
              <b>Tailwind CSS</b> - uma framework de CSS;
            </li>
            <li>
              <b>SQLite</b> - através de um banco de dados SQLite manipulado
              através da biblioteca better-sqlite3;
            </li>
          </ul>
          <p className="p-primary">
            Para a gestão da base de dados, podia ter optado por um ORM como o
            Prisma, mas decidi não o fazer pois queria ganhar alguma experiência
            ao trabalhar com SQL mais directamente.
          </p>
          <h3 className="h3-title">Funcionalidades actuais e futuras</h3>
          <p className="p-primary">
            Para este MVP (<i>Minimum Viable Product</i>) decidi focar-me em
            algumas funcionalidades básicas:
          </p>
          <ul className="list-text">
            <li>
              Simulação de consulta de leituras através do método das moedas;
            </li>
            <li>
              Registo e login, com possibilidade de guardar, anotar e apagar
              consultas no arquivo;
            </li>
            <li>Interface melhorado para leitura e anotações;</li>
            <li>
              Acesso a textos para cada hexagrama (Julgamento, Imagem e Linhas),
              tanto em leituras como em tabelas;
            </li>

            <li>Formulário de contacto simples;</li>
          </ul>
          <p className="p-primary">
            Posteriormente, existem algumas melhorias que quero implementar:
          </p>
          <ul className="list-text">
            <li>
              Integrar novos métodos como o método dos talos de milefólio e
              também o método das moedas modificado;
            </li>
            <li>
              Modo administrador que facilita o upload e tradução dos textos
              disponibilizados;
            </li>
            <li>
              Integração da possibilidade de estudar consultas feitas
              manualmente;
            </li>
            <li>
              Criação de uma página Blogue para divulgação de alguns conceitos
              do I Ching;
            </li>
            <li>Melhoria de login e registo;</li>

            <li>Melhoria de formulários de contacto;</li>
            <li>Sistema de marcação de consultas de I Chings;</li>
            <li>
              Criar dashboard com algumas informações importantes sobre
              estatísticas e actividade recente do utilizador;
            </li>
          </ul>
        </div>
        <div className="content-side">
          {' '}
          <AnimatedHexagrams />
          <p className="p-caption"></p>
        </div>
      </div>
    </section>
  )
}
