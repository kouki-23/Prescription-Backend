import { twMerge } from "tailwind-merge"

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  className?: string
}

export default function TextInput({ value, setValue, className }: Props) {
  return (
    <input
      type="text"
      className={twMerge(
        "bg-primary-gray rounded-lg h-7 px-2 focus:outline-secondary-blue",
        className,
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
