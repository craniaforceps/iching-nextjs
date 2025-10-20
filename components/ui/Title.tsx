type TitleProps = {
  title: string
}

// Componente do título reutilizável
const Title = ({ title }: TitleProps) => {
  return (
    <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-center px-0 mb-6">
      {title}
    </h1>
  )
}

export default Title
