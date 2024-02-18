import { useAuth } from "../../helpers/auth/auth"

type Props = {}

export default function Index({}: Props) {
  const { user } = useAuth()
  return <div>{user?.name}</div>
}
