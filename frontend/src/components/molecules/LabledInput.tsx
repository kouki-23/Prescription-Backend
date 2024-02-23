import TextInput from "../atoms/TextInput"

type Props = {
  text: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function LabledInput({ text, value, setValue }: Props) {
  return (
    <div>
      <label className="block mb-0">{text}</label>
      <TextInput value={value} setValue={setValue} />
    </div>
  )
}
