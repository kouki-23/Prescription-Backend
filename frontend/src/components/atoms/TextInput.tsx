import { twMerge } from "tailwind-merge"

type Props = {
  value: string
  setValue: (s: string) => void
  className?: string
  disabled?: boolean
  isNumber?: boolean
}

export default function TextInput({
  value,
  setValue,
  className,
  disabled,
  isNumber,
}: Props) {
  return (
    <input
      type={isNumber ? "number" : "text"}
      className={twMerge(
        "bg-primary-gray rounded-lg py-2 px-4 focus:outline-secondary-blue shadow-md",
        className,
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  )
}
