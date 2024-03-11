import TextInput from "../atoms/TextInput"

type Props = {
  text: string
  value: string
  setValue: (s: string) => void
  disabled?: boolean
  isNumber?: boolean
}

export default function LabledInput({
  text,
  value,
  setValue,
  disabled,
  isNumber,
}: Props) {
  return (
    <div>
      <label className="block mb-2 text-xl">{text}</label>
      <TextInput
        className="w-96"
        value={value}
        setValue={setValue}
        disabled={disabled}
        isNumber={isNumber}
      />
    </div>
  )
}
