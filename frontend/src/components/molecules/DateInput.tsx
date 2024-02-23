type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
export default function DateInput({ value, setValue }: Props) {
  return (
    <div>
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(72%) sepia(72%) saturate(2977%) hue-rotate(194deg) brightness(98%) contrast(99%);
          }
        `}
      </style>
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="relative w-56 h-8  cursor-pointer rounded-lg  px-3 bg-primary-gray flex justify-center sm:text-sm stroke-none focus:outline-none"
      />
    </div>
  )
}
