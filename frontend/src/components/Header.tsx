
type Props = {
  title: string;
  subtitle: string;
}

export function Header({title,subtitle}:Props) {
  return (
    <>
      <h1 className="display-1 text-center">{title}</h1>
      <p className="text-center">{subtitle}</p>
    </>
  )
}
