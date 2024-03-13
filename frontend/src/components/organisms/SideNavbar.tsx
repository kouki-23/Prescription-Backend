import dashboardIcon from "@assets/icons/dashboard.svg"
import statistiqueIcon from "@assets/icons/stats.svg"
import userIcon from "@assets/icons/user_gray.svg"
import protocoleIcon from "@assets/icons/protocoles.svg"
export default function SideNavbar() {
  return (
    <aside className="bg-white-shade shadow-sm fixed inset-0 z-50 w-60 h-screen">
      <NavElement
        icon={dashboardIcon}
        text="Dashboard"
        isSelected={true}
        size={8}
      />
      <NavElement
        icon={statistiqueIcon}
        text="Statistiques"
        size={6}
        isSelected={false}
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
    </aside>
  )
}

type PropsElement = {
  icon: string
  text: string
  isSelected: boolean
  size: number
}

function NavElement({ icon, text, size }: PropsElement) {
  return (
    <div>
      <button className="flex justify-between w-44 items-center p-3 font-normal cursor-pointer hover:bg-light-blue hover:opacity-20 ">
        <img className={`size-${size}`} src={icon} />
        <h3>{text}</h3>
      </button>
    </div>
  )
}
