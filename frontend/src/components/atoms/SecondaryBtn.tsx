type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}
export default function SecondaryBtn(props: props) {
  const { text, clickFn } = props
  return (
    <button className="bg-gray-button bg-opacity-38  rounded-lg h-9 px-5 m-2 text-white-shade font-bold focus:shadow-outline hover:bg-gray-button bg-opacity-40">
      {text}
    </button>
  )
}
