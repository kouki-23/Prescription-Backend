import { Navigate } from "react-router-dom"
import { useAuth } from "@helpers/auth/auth"
import ErrorPage from "@pages/Error/ErrorPage"

type Props = {}

export default function Index({}: Props) {
  const { user } = useAuth()
  if (user?.role === "medecin") {
    return <Navigate to={"/medecin"} />
  } else if (user?.role === "pharmacien") {
    return <Navigate to={"/pharmacien"} />
  } else if (user?.role === "admin") {
    return <Navigate to={"/admin"} />
  } else {
    return <ErrorPage cause="unkown role" />
  }
}
