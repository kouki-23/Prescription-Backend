import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import ProtocolTable from "@components/organisms/ProtocolTable"
import { getAllProtocols } from "@helpers/apis/protocol"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import addIcon from "@assets/icons/add.svg"
import { useNavigate } from "react-router-dom"

type Props = {}

export default function ListProtocol({}: Props) {
  const navigator = useNavigate()
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["protocols"],
    queryFn: getAllProtocols,
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  return (
    <div className="container mx-auto my-32">
      <div className="my-10 flex justify-between">
        <Title text="Liste des protocols" />
        <div className="flex gap-2 items-center">
          <img
            className="size-10 cursor-pointer"
            src={addIcon}
            onClick={() => navigator("ajouterprotocole")}
            alt="ajouter patient"
          />
        </div>
      </div>
      {data && <ProtocolTable protocols={data.data} refetch={refetch} />}
    </div>
  )
}
