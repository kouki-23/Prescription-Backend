type props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}
export default function PrimaryBtn(props: props) {
  const { text, clickFn } = props
  return (
    <button className="bg-secondary-blue bg-opacity-85 rounded-lg h-9 px-5 m-2 text-white-shade font-bold focus:shadow-outline hover:bg-secondary-blue bg-opacity-87">
      {text}
    </button>
  )
}
