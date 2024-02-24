type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function TextInput({ value, setValue }: Props) {
  return (
    <input
      type="text"
      className="bg-primary-gray rounded-lg h-7 px-2 focus:outline-secondary-blue"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
