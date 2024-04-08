import Title from "@components/atoms/Title"
import SideNavbar from "@components/organisms/SideNavbar"
import { SpecialtityTable } from "@components/organisms/SpecialityTable"
import { useNavigate } from "react-router-dom"
import addIcon from "@assets/icons/add.svg"
type Props = {}
export default function SpecialityList({}: Props) {
  const navigate = useNavigate()

  return (
    <div className="flex">
      <SideNavbar />
      <div className="w-4/5 px-12">
        <div className="container mx-auto my-8 mt-32 flex justify-between ">
          <Title text="Liste spécialité " />
          <img
            className=" size-10 cursor-pointer  "
            src={addIcon}
            alt="ajouter specialité"
          />
        </div>
        <SpecialtityTable />
      </div>
    </div>
  )
}
