import { twMerge } from "tailwind-merge"

type Props = {
  value: string
  setValue: (s: string) => void
  className?: string
}
export default function DateInput({ value, setValue, className }: Props) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={twMerge(
        "w-56 rounded-lg py-2 px-2 bg-primary-gray sm:text-sm stroke-none focus:outline-none shadow-md",
        className,
      )}
    />
  )
}
