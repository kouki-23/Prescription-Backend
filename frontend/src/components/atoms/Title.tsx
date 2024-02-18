type Props = {
  text: string
  className: string
}

export default function Title({ className, text }: Props) {
  return (
    <h1
      className={className + " " + "text-title text-primary-blue font-medium"}
    >
      {text}
    </h1>
  )
}
