import dashboardIcon from "@assets/icons/dashboard.svg"
import userIcon from "@assets/icons/user_white.svg"
import protocoleIcon from "@assets/icons/protocoles.svg"
import moleculeIcon from "@assets/icons/molecule_white.svg"
import specialiteIcon from "@assets/icons/specialite.svg"
import logoutIcon from "@assets/icons/gray_logout.svg"
import searchIcon from "@assets/icons/search.svg"
import { useAuth } from "@helpers/auth/auth"
import { useNavigate } from "react-router-dom"

type Props = {}

export default function SideNavbar({}: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function goToHome() {
    navigate("/")
  }
  return (
    <>
      <div className="text-gray-button flex absolute right-4 top-2 items-center gap-1">
        <div className="flex flex-col items-end">
          <p className="font-bold text-lg">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <img className=" size-7 cursor-pointer" src={logoutIcon} />
      </div>
      <div className="bg-primary-blue shadow-sm h-screen w-1/5 ">
        <aside className="mt-10">
          <NavElement
            icon={dashboardIcon}
            text="Dashboard"
            isSelected={true}
            size={8}
          />
          <NavElement
            icon={userIcon}
            text="Utilisateurs"
            size={7}
            isSelected={false}
          />
          <NavElement
            icon={protocoleIcon}
            text="Protocoles"
            size={8}
            isSelected={false}
          />
          <NavElement
            icon={moleculeIcon}
            text="Molecules"
            size={8}
            isSelected={false}
          />
          <NavElement
            icon={specialiteIcon}
            text="Specialité"
            size={8}
            isSelected={false}
          />
        </aside>
      </div>
    </>
  )
}

type PropsElement = {
  icon: string
  text?: string
  isSelected: boolean
  size: number
}

function NavElement({ icon, text, size }: PropsElement) {
  return (
    <div className=" hover:bg-white-shade hover:opacity-45  transition duration-75">
      <button className="flex justify-between w-44 items-center p-3 font-normal cursor-pointer ">
        <img className={`size-${size}`} src={icon} />
        <h3 className="text-white-shade">{text}</h3>
      </button>
    </div>
  )
}

function SearchLabel() {
  return (
    <div className="relative w-full items-center">
      <input
        type="text"
        className="bg-gray-table border text-gray-button text-sm rounded-lg focus:ring-light-blue focus:border-b-light-blue block w-full  dark:placeholder-gray-400 "
        placeholder="Rechercher spécialité"
        required
      />
    </div>
  )
}
