type Props = {}

export default function Loading({}: Props) {
  return (
    <div className="flex gap-2">
      <div className="w-5 h-5 rounded-full animate-pulse bg-primary-blue"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-primary-blue"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-primary-blue"></div>
    </div>
  )
}
