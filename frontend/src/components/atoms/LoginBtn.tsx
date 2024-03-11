import { useEffect, useRef } from "react"

type Props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function LoginBtn({ text, clickFn }: Props) {
  const btn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault()
        btn.current?.click()
      }
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [])
  return (
    <button
      className="bg-primary-blue bg-opacity-90 rounded-md px-20 py-2 text-white-shade text-2xl font-semibold hover:bg-opacity-100"
      onClick={clickFn}
      ref={btn}
    >
      {text}
    </button>
  )
}
