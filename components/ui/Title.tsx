type TitleProps = {
  title: string
}

// Componente do título reutilizável
const Title = ({ title }: TitleProps) => {
  return <h1 className="text-3xl font-bold text-center px-6 mb-6">{title}</h1>
}

export default Title
