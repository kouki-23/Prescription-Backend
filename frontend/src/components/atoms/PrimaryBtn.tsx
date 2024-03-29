import { useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"

type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  isDefault?: boolean
}

export default function PrimaryBtn({
  text,
  clickFn,
  className,
  disabled,
  isDefault,
}: props) {
  const btn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (isDefault) {
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
    }
  }, [])

  return (
    <button
      ref={btn}
      onClick={clickFn}
      className={twMerge(
        "bg-secondary-blue bg-opacity-85 rounded-2xl px-12 py-3 text-white-shade font-bold hover:bg-opacity-100",
        className,
      )}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
