import { twMerge } from "tailwind-merge"

export type Tprops = {
  value: string
  setValue: (s: string) => void
  className?: string
  disabled?: boolean
  isNumber?: boolean
}
export function AdminTextInput({
  value,
  setValue,
  className,
  disabled,
}: Tprops) {
  return (
    <input
      className={twMerge(
        `bg-primary-gray rounded-lg px-4 focus:outline-secondary-blue shadow-md ${
          disabled ? "bg-secondary-gray" : null
        }`,
        className,
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  )
}
