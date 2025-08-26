import Title from '@/components/ui/Title'

export default function SobrePage() {
  return (
    <main className="w-full max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <div className="w-full  text-justify mx-auto">
        <Title title="Sobre o I Ching" />

        <h3>História e contexto</h3>
        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Quas amet, quaerat
          sunt praesentium soluta nulla ex est deleniti animi.
        </p>

        <h3>Os vários métodos</h3>

        <p className="text-justify">
          Fugit itaque obcaecati saepe. Error voluptates aperiam vel ex modi
          atque. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>

        <ul>
          <li>Método da Moeda (M)</li>

          <li>Método da Moeda Modificado (MM)</li>

          <li>Método dos Talos de Milefólio (T)</li>

          <li>Método dos Talos de Milefólio Modificado (TM)</li>
        </ul>

        <h3>Probabilidades de cada método</h3>

        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
          itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
        </p>

        <h3>A escolha de um método</h3>

        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas amet,
          quaerat sunt praesentium soluta nulla ex est deleniti animi. Fugit
          itaque obcaecati saepe. Error voluptates aperiam vel ex modi atque.
        </p>
      </div>
    </main>
  )
}
