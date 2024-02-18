type Props = {
  cause: string
}

export default function ErrorPage({ cause }: Props) {
  return <div>{cause}</div>
}
