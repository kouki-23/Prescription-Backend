import { twMerge } from "tailwind-merge"

type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function SecondaryBtn({ text, clickFn, className }: props) {
  return (
    <button
      onClick={clickFn}
      className={twMerge(
        "bg-gray-button bg-opacity-70 rounded-2xl px-12 py-3 text-white-shade font-bold hover:bg-opacity-100",
        className,
      )}
    >
      {text}
    </button>
  )
}
