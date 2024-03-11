type Props = {
  icon: string
  value: string
  setValue: Function
  type?: string
  placeholder?: string
}

export default function LoginInput({
  icon,
  value,
  setValue,
  type,
  placeholder,
}: Props) {
  return (
    <div className="w-full">
      <p className="text-2xl opacity-80 mb-1"></p>
      <div className="flex items-center w-auto">
        <img className="absolute w-3 h-3 ml-2" src={icon} />
        <input
          className="bg-primary-gray w-full pl-8 py-1 bg-opacity-20 focus:outline-primary-blue border-2 border-primary-blue border-opacity-10"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
