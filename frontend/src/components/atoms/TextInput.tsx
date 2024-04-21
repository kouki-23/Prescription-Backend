import { twMerge } from "tailwind-merge"

type Props = {
  value: string | number
  setValue: (s: string) => void
  className?: string
  disabled?: boolean
  isNumber?: boolean
  isPassword?: boolean
  onBlur?: () => void
}

export default function TextInput({
  value,
  setValue,
  className,
  disabled,
  isNumber,
  isPassword,
  onBlur,
}: Props) {
  return (
    <input
      type={isNumber ? "number" : isPassword ? "password" : "text"}
      className={twMerge(
        `bg-primary-gray rounded-lg py-2 px-4 focus:outline-secondary-blue shadow-md ${
          disabled ? "bg-secondary-gray" : null
        }`,
        className,
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
      onBlur={onBlur}
    />
  )
}
