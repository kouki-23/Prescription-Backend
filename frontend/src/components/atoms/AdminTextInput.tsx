import { twMerge } from "tailwind-merge"

export type Tprops = {
  value: string | number
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
  isNumber,
}: Tprops) {
  return (
    <input
      type={isNumber ? "number" : "text"}
      className={twMerge(
        `bg-white-shade bg-opacity-50 rounded-lg py-2 px-4 border border-primary-blue border-opacity-20 w-72 h-7  focus:outline-secondary-blue shadow-none ${
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
