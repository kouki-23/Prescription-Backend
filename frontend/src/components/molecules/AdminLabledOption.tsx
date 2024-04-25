import AdminOptionInput from "@components/atoms/AdminOptionInput"
import { Option } from "@helpers/types"
import { twMerge } from "tailwind-merge"

export type OptionProps<T> = {
  text: string
  selected: Option<T> | undefined
  setSelected: (s: Option<T>) => void
  options: Option<T>[]
  className?: string
}

export function AdminLabledOption<T>({
  text,
  selected,
  options,
  setSelected,
  className,
}: OptionProps<T>) {
  return (
    <div>
      <label className={twMerge("block mb-2 text-xl", className)}>{text}</label>
      <AdminOptionInput
        options={options}
        selected={selected}
        setSelected={setSelected}
        className={className}
      />
    </div>
  )
}
