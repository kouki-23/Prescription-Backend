import dashboardIcon from "@assets/icons/dashboard.svg"
import userIcon from "@assets/icons/user_white.svg"
import protocoleIcon from "@assets/icons/protocoles.svg"
import moleculeIcon from "@assets/icons/molecule_white.svg"
import specialiteIcon from "@assets/icons/specialite.svg"
import logoutIcon from "@assets/icons/gray_logout.svg"
import { useAuth } from "@helpers/auth/auth"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"

type Props = {}

export default function SideNavbar({}: Props) {
  const { user, logout } = useAuth()
  const [selected, setSelected] = useState(getPath(window.location.pathname))
  const navigate = useNavigate()

  function logoutClick() {
    logout()
    navigate("/login")
  }
  return (
    <div className="flex">
      <div className=" absolute text-gray-button flex right-4 top-2 items-center gap-1">
        <div className="flex flex-col items-end">
          <p className="font-bold text-lg">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <img
          className=" size-7 cursor-pointer"
          src={logoutIcon}
          onClick={logoutClick}
        />
      </div>
      <div className="bg-primary-blue shadow-sm h-screen w-1/5 z-10">
        <aside className="mt-10 fixed bg-primary-blue h-screen w-1/5 z-10">
          <NavElement
            icon={dashboardIcon}
            text="Dashboard"
            selected={selected}
            setSelected={setSelected}
            to=""
            size={8}
          />
          <NavElement
            icon={userIcon}
            text="Utilisateurs"
            size={7}
            to="users"
            selected={selected}
            setSelected={setSelected}
          />
          <NavElement
            icon={protocoleIcon}
            text="Protocoles"
            size={8}
            to="protocols"
            selected={selected}
            setSelected={setSelected}
          />
          <NavElement
            icon={moleculeIcon}
            text="Molecules"
            size={8}
            to="molecules"
            selected={selected}
            setSelected={setSelected}
          />
          <NavElement
            icon={specialiteIcon}
            text="Specialité"
            size={8}
            to="specialite"
            selected={selected}
            setSelected={setSelected}
          />
        </aside>
      </div>
      <div className="w-4/5 px-10">
        <Outlet />
      </div>
    </div>
  )
}

type PropsElement = {
  icon: string
  text: string
  size: number
  to: string
  selected: string
  setSelected: (url: string) => void
}

function NavElement({
  icon,
  text,
  size,
  to,
  selected,
  setSelected,
}: PropsElement) {
  const isSelected = selected === to

  return (
    <div
      className={`hover:bg-white-shade hover:bg-opacity-20  transition duration-75 ${
        isSelected ? "bg-white-shade bg-opacity-50" : ""
      }`}
    >
      <Link
        to={to}
        className="flex justify-between w-44 items-center p-3 font-normal cursor-pointer"
        onClick={() => setSelected(to)}
      >
        <img className={`size-${size}`} src={icon} />
        <h3 className="text-white-shade">{text}</h3>
      </Link>
    </div>
  )
}

function getPath(pathName: string): string {
  const indexSlach = pathName.indexOf("/", 1)
  if (indexSlach === -1) {
    return ""
  }
  return pathName.substring(indexSlach + 1, pathName.length)
}
