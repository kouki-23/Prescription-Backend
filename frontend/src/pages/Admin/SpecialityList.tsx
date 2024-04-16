import Title from "@components/atoms/Title"
import { SpecialtityTable } from "@components/organisms/SpecialityTable"
import { useNavigate } from "react-router-dom"
import addIcon from "@assets/icons/add.svg"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "@helpers/apis/product"
import { SearchInput } from "@components/atoms/SearchInput"
import LoadingInterface from "@components/organisms/LoadingInterface"
import ErrorPage from "@pages/Error/ErrorPage"

type Props = {}
export default function SpecialityList({}: Props) {
  const navigate = useNavigate()
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  return (
    <div>
      <SearchInput placeholder="Rechercher specialité" />
      <div className="container mx-auto my-8 mt-32 flex justify-between ">
        <Title text="Liste spécialité " />
        <img
          className=" size-10 cursor-pointer  "
          src={addIcon}
          onClick={() => navigate("/admin/ajouterSpecialite")}
          alt="ajouter specialité"
        />
      </div>
      <SpecialtityTable data={data!} refetch={refetch} />
    </div>
  )
}
