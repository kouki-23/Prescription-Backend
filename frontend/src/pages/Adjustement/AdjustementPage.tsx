import Title from "@components/atoms/Title"
import AdjustementTable from "@components/organisms/AdjustementTable"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { getAllValidPrepMolecules } from "@helpers/apis/prepMolcule"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"

export default function AdjustementPage() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["prepmolecules", "valid"],
    queryFn: getAllValidPrepMolecules,
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  console.log(data)
  return (
    <div className="container mx-auto space-y-5 mt-20 px-10">
      <Title text="Liste des ajustements" />
      <AdjustementTable data={data!.data} refetch={refetch} />
    </div>
  )
}
