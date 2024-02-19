type props = {
  text: string
  value: string
  setValue: Function
}

export default function LabledInput({ text, value, setValue }: props) {
  return (
    <div>
      <label className="block mb-0">{text}</label>
      <input
        type="text"
        className="bg-primary-gray rounded-lg h-7 px-2 focus:outline-secondary-blue"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
