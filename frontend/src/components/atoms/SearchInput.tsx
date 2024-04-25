import searchIcon from "@assets/icons/search.svg"
export function SearchInput({ placeholder }: { placeholder?: string }) {
  return (
    <label>
      <div className=" relative mt-2 ">
        <input
          type="search"
          className="border rounded-lg bg-gray-table border-none h-8 w-80 focus:outline-none shadow-md pl-8"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <img src={searchIcon} className="size-4" />
        </div>
      </div>
    </label>
  )
}
