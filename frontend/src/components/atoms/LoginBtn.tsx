import { Button } from "@mui/base"

type Props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function LoginBtn(props: Props) {
  const { text, clickFn } = props
  return (
    <Button
      className="bg-primary-blue bg-opacity-90 rounded-md px-32 py-3 text-white-shade text-3xl font-semibold"
      onClick={clickFn}
    >
      {text}
    </Button>
  )
}
