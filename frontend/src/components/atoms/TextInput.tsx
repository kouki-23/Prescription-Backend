import { twMerge } from "tailwind-merge"

type Props = {
  value: string
  setValue: Function
  className?: string
  disabled?: boolean
}

export default function TextInput({
  value,
  setValue,
  className,
  disabled,
}: Props) {
  return (
    <input
      type="text"
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
