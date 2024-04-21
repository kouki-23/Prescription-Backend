import { AdminTextInput } from "./AdminTextInput"

type Props = {
  text: string
  value: string
  setValue: (s: string) => void
  disabled?: boolean
  isNumber?: boolean
}
export function AdminLabledInput({
  text,
  value,
  setValue,
  disabled,
  isNumber,
}: Props) {
  return (
    <div>
      <label className="block mb-2 text-xl">{text}</label>
      <AdminTextInput
        className="bg-white-shade bg-opacity-50 rounded-lg py-2 px-4 border border-primary-blue border-opacity-20 w-72 h-7  focus:outline-secondary-blue shadow-none"
        value={value}
        setValue={setValue}
        disabled={disabled}
        isNumber={isNumber}
      />
    </div>
  )
}
