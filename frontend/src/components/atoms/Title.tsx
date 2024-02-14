type Props = {
  text: string
}

export default function Title({ text }: Props) {
  return <h1 className="text-title text-primary-blue font-medium">{text}</h1>
}
