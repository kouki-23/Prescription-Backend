import { twMerge } from "tailwind-merge"

type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function PrimaryBtn({ text, clickFn, className }: props) {
  return (
    <button
      onClick={clickFn}
      className={twMerge(
        "bg-secondary-blue bg-opacity-85 rounded-2xl px-12 py-3 text-white-shade font-bold hover:bg-opacity-100",
        className,
      )}
    >
      {text}
    </button>
  )
}
