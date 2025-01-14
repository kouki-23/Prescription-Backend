import scrollIcon from "@assets/icons/iconscroll.svg"
import checkIcon from "@assets/icons/CheckIcon.svg"
import { Listbox } from "@headlessui/react"
import { Option } from "@helpers/types"
import { twMerge } from "tailwind-merge"

type Props<keyT> = {
  selected: Option<keyT> | null | undefined
  setSelected: (option: Option<keyT>) => void
  options: Option<keyT>[]
  className?: string
  size?: number | "sm" | "md" | "lg"
}

export default function OptionInput<keyT>({
  options,
  selected,
  setSelected,
  className,
  size = "md",
}: Props<keyT>) {
  const width = size === "sm" ? "w-64" : size === "md" ? "w-96" : "w-128"
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button
        className={twMerge(
          `relative ${width} py-2 min-h-10 cursor-pointer rounded-lg  bg-primary-gray flex items-center justify-center sm:text-sm shadow-md`,
          className,
        )}
      >
        <img className="absolute end-1" src={scrollIcon} />
        {selected ? selected.label : "Sélectionner"}
      </Listbox.Button>
      <Listbox.Options
        className={`absolute z-10 bg-white-shade overflow-auto max-h-60 ${width} rounded-lg bg-white text-base shadow-md text-center sm:text-sm`}
      >
        {options.map((option) => (
          <Listbox.Option
            key={String(option.value)}
            value={option}
            className="hover:bg-light-blue transition-colors opacity-75 cursor-pointer py-1"
          >
            {({ selected }) => (
              <div className="relative">
                <span
                  className={`block truncate  ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  {option.label}
                </span>
                {selected && (
                  <img
                    className="absolute left-0 top-0 pl-3 text-amber-600 size-6"
                    src={checkIcon}
                  ></img>
                )}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
