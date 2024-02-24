import scrollIcon from "@assets/icons/iconscroll.svg"
import checkIcon from "@assets/icons/CheckIcon.svg"
import { Listbox } from "@headlessui/react"
type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  options: string[]
}
export default function ({ options, value, setValue }: Props) {
  return (
    <Listbox value={value} onChange={setValue}>
      <Listbox.Button className="relative w-56 h-8 cursor-pointer rounded-lg  bg-primary-gray flex items-center justify-center sm:text-sm">
        <img className="absolute end-1" src={scrollIcon} />
        {value}
      </Listbox.Button>
      <Listbox.Options className="absolute z-10 bg-white-shade overflow-auto max-h-60 w-56 rounded-lg bg-white text-base shadow-sm text-center sm:text-sm ">
        {options.map((option) => (
          <Listbox.Option
            key={option}
            value={option}
            className="hover:bg-light-blue transition-colors opacity-75 cursor-pointer"
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate  ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  {option}
                </span>
                {selected && (
                  <img
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 w-7 h-7 "
                    src={checkIcon}
                  ></img>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
