type Props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function LoginBtn({ text, clickFn }: Props) {
  return (
    <button
      className="bg-primary-blue bg-opacity-90 rounded-md px-28 py-2 text-white-shade text-2xl font-semibold hover:bg-opacity-100"
      onClick={clickFn}
    >
      {text}
    </button>
  )
}
