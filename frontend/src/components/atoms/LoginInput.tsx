type Props = {
  label: string
  icon: string
  value: string
  setValue: Function
  type?: string
}

export default function LoginInput({
  label,
  icon,
  value,
  setValue,
  type,
}: Props) {
  return (
    <div className="w-full">
      <p className="text-2xl opacity-80 mb-1">{label}</p>
      <div className="flex items-center w-auto">
        <img className="absolute w-5 h-5 ml-2" src={icon} />
        <input
          className="bg-primary-gray w-full pl-8 py-1 bg-opacity-20 focus:outline-primary-blue border-2 border-primary-blue border-opacity-10"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type={type}
        />
      </div>
    </div>
  )
}
