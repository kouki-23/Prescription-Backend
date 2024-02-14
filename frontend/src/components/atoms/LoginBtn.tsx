import { Button } from "@mui/base"

type Props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function LoginBtn({ text, clickFn }: Props) {
  return (
    <Button
      className="bg-primary-blue bg-opacity-90 rounded-md px-36 py-3 text-white-shade text-3xl font-semibold"
      onClick={clickFn}
    >
      {text}
    </Button>
  )
}
