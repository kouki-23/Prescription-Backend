import Loading from "@components/atoms/Loading"
import ListPrescription from "@components/organisms/ListPrescription"
import { getPrescriptionByPatientId } from "@helpers/apis/prescription"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import backIcon from "@assets/icons/back.svg"

type Props = {}

export default function PrescriptionPage({}: Props) {
  const naviagator = useNavigate()
  const { patientId } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prescription", patientId],
    queryFn: () => getPrescriptionByPatientId(Number(patientId)),
  })

  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div className="flex">
      <div className="w-2/3 px-9 pt-7">
        <img
          className="cursor-pointer pb-5"
          src={backIcon}
          onClick={() => naviagator(-1)}
        />
        {data?.data && <ListPrescription prescriptions={data?.data} />}
      </div>
      <div className="w-1/3">
        <pre>{JSON.stringify(data?.data[0].patient, null, 2)}</pre>
      </div>
    </div>
  )
}
