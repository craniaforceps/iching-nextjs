'use client'
import Image from 'next/image'
import RandomHexagramSequential from '../ui/exp/SequentialHexagram'
import AnimatedHexagrams from '../ui/exp/Experimento'

export default function Project() {
  return (
    <section className="main-section">
      <div className="content-split flex-col">
        <div className="content-main w-3/4">
          <h2 className="h2-title">E-Ching - Website das Mutações</h2>
          <div className="flex flex-row mx-auto justify-center items-center gap-0 w-[300px]">
            {' '}
            {/* <Image
              src="/images/svg/bowmen.svg"
              width={300}
              height={300}
              alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                          (1700-1725)"
              quality={75}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:w-[200px] w-[130px] h-auto transform  dark:invert transition duration-300"
            />
            <Image
              src="/images/svg/bowmen.svg"
              width={300}
              height={300}
              alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                          (1700-1725)"
              quality={75}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:w-[200px] w-[130px] h-auto transform -scale-x-100 dark:invert transition duration-300"
            /> */}
            <Image
              src="/images/svg/bowman.png"
              width={1562}
              height={2384}
              alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                          (1700-1725)"
              quality={75}
              sizes="(max-width: 768px) 100vw, 40vw"
              className=" h-auto dark:invert transition duration-300"
            />
          </div>
          <h3 className="h3-title">Apresentação</h3>{' '}
          <p className="p-primary">
            O meu interesse pelo I Ching começou há mais de dez anos, após
            ter-me começado a interessar por literatura oriental, na qual
            encontrei alguns conceitos como o Yin Yang e o Tao que eventualmente
            me levaram ao I Ching.
          </p>
          <p className="p-primary">
            Atendendo a que recentemente decidi aprender web developing, este
            website pareceu-me a melhor forma de fazer uma ferramenta que me
            fosse útil e que também mostrasse alguns dos meus conhecimentos de
            programação.
          </p>
          <p className="p-primary">
            O objectivo passa por dar aos utilizadores algumas funcionalidades
            que, no meu entender, podem melhorar e tornar mais eficiente a
            consulta e a própria aprendizagem do I Ching. Também se poderá
            estender a consciencializar um eventual público, em particular o
            lusófono, para as qualidades desta filosofia milenar.
          </p>
          <div className="flex flex-row mx-auto justify-center items-center gap-0 w-[300px]">
            {' '}
            <Image
              src="/images/svg/robe-guy-png.svg"
              width={1510}
              height={2150}
              alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng
                          (1700-1725)"
              quality={75}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-auto  dark:invert transition duration-300"
            />
          </div>
          <h3 className="h3-title">Abordagem técnica</h3>
          <p className="p-primary">
            Resumidamente usei o Next JS 15, Tailwind CSS e SQLite.
            Inicialmente, usei base de dados local (com DBeaver), mas entretanto
            para produção em Vercel tive de mudar e optei pelo Turso. Não usei
            nenhum ORM pois queria trabalhar com SQL diretamente.
          </p>
          <p className="p-primary">Inserir GitHub e blogue.</p>
          <h3 className="h3-title">Versão e funcionalidades</h3>
          <p className="p-primary">
            Esta é a primeira versão focada num MVP relativamente simples.
          </p>
          <ul className="list-text  px-3 p-primary">
            <li>
              Simulação de consulta de leituras através do método das moedas ;
            </li>
            <li>Serviços básicos de registo e login;</li>
            <li>
              Anotar, guardar, editar e apagar leituras, com interface melhorado
              para leitura e edições em desktop;
            </li>
            <li>
              Acesso a textos para cada hexagrama (Julgamento, Imagem e Linhas),
              tanto em leituras como em tabelas;
            </li>

            <li>Formulário de contacto simples;</li>

            <li>
              Definições básicas de apagar conta, mudar email e mudar password;
            </li>
          </ul>
          <p className="p-primary">
            Apesar de existirem implementações planeadas a médio-prazo, neste
            momento apenas estão a ser feitas melhorias.
          </p>
          {/* <ul className="list-text">
          <li>
            Integrar novos métodos como o método dos talos de milefólio e também
            o método das moedas modificado;
          </li>
          <li>
            Modo administrador que facilita o upload e tradução dos textos
            disponibilizados;
          </li>
          <li>
            Integração da possibilidade de estudar consultas feitas manualmente;
          </li>
          <li>
            Criação de uma página Blogue para divulgação de alguns conceitos do
            I Ching;
          </li>
          <li>Melhoria de login e registo;</li>

          <li>Melhoria de formulários de contacto;</li>
          <li>Sistema de marcação de consultas de I Chings;</li>
          <li>
            Criar dashboard com algumas informações importantes sobre
            estatísticas e actividade recente do utilizador;
          </li>
        </ul> */}
        </div>
      </div>
    </section>
  )
}
