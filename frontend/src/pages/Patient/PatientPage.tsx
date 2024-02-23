import { useQuery } from "@tanstack/react-query"
import PatientTable, {
  TPatientTable,
} from "../../components/organisms/PatientTable"
import { getAllPatients } from "../../helpers/apis"
import Loading from "../../components/atoms/Loading"
import ErrorPage from "../Error/ErrorPage"
import { Patient } from "../../types/patient"

type Props = {}

export default function PatientPage({}: Props) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  })
  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />
  const patients = data ? data : []
  return (
    <div>
      <PatientTable data={transformPatientToTablePatient(patients)} />
    </div>
  )
}

function transformPatientToTablePatient(p: Patient[]): TPatientTable[] {
  let patients: TPatientTable[] = []
  p.forEach((e) => {
    patients.push({
      id: e.id,
      DMI: e.DMI,
      firstName: e.firstName,
      lastName: e.lastName,
      birthDate: e.birthDate,
      gender: e.gender,
      index: e.index,
    })
  })

  return patients
}
