type Props = {
  icon: string
  value: string
  setValue: Function
}

export default function LoginInput({ icon, value, setValue }: Props) {
  return (
    <div className="flex items-center">
      <img className="absolute w-5 h-5 ml-2" src={icon} />
      <input
        className="bg-primary-gray w-full pl-8 py-1 bg-opacity-20 border-2 border-primary-blue border-opacity-10"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}
