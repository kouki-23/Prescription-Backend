import TextInput from "../atoms/TextInput"

type Props = {
  text: string
  value: string
  setValue: Function
  disabled?: boolean
}

export default function LabledInput({
  text,
  value,
  setValue,
  disabled,
}: Props) {
  return (
    <div>
      <label className="block mb-2 text-2xl">{text}</label>
      <TextInput
        className="w-96 py-3"
        value={value}
        setValue={setValue}
        disabled={disabled}
      />
    </div>
  )
}
