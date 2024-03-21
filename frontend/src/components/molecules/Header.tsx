import { useNavigate } from "react-router-dom"
import logo from "@assets/asqii_logo.svg"
import logoutIcon from "@assets/icons/logout.svg"
import { useAuth } from "@helpers/auth/auth"
type Props = {}

export default function Header({}: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function goToHome() {
    navigate("/")
  }
  function logoutClick() {
    logout()
    navigate("/login")
  }
  return (
    <header className="w-screen bg-primary-blue flex items-center px-7 py-3 justify-between">
      <img className="size-12 cursor-pointer" onClick={goToHome} src={logo} />
      <div className="flex gap-1 items-center">
        <div className="text-white-shade flex flex-col items-end">
          <p className="font-bold text-lg">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <img
          className="size-10 cursor-pointer"
          onClick={logoutClick}
          src={logoutIcon}
        />
      </div>
    </header>
  )
}
