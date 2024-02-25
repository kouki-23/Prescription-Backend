import { twMerge } from "tailwind-merge"
type Props = {
  text: string
  className?: string
}

export default function Title({ className, text }: Props) {
  return (
    <h1
      className={twMerge("text-title text-primary-blue font-medium", className)}
    >
      {text}
    </h1>
  )
}
