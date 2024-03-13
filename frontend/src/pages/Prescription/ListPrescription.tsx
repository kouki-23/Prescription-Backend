import Loading from "@components/atoms/Loading"
import { getPrescriptionByPatientId } from "@helpers/apis/prescription"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type Props = {}

export default function ListPrescription({}: Props) {
  const { patientId } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prescription"],
    queryFn: () => getPrescriptionByPatientId(Number(patientId)),
  })

  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div>
      <pre>{JSON.stringify(data?.data, null, 2)}</pre>
    </div>
  )
}
