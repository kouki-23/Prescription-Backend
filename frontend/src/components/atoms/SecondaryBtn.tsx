type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function SecondaryBtn({ text, clickFn }: props) {
  return (
    <button
      onClick={clickFn}
      className="bg-gray-button bg-opacity-35  rounded-lg h-9 px-5 m-2 text-white-shade font-bold  hover:bg-opacity-100"
    >
      {text}
    </button>
  )
}
