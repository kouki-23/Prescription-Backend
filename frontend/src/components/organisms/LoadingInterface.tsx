import Loading from "../atoms/Loading"

type Props = {}

export default function LoadingInterface({}: Props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading />
    </div>
  )
}
