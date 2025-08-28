type TitleProps = {
  title: string
}

const Title = ({ title }: TitleProps) => {
  return <h1 className="text-3xl font-bold text-center pt-6 mb-6">{title}</h1>
}

export default Title
