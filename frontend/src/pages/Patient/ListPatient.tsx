import { useQuery } from "@tanstack/react-query"
import PatientTable, { TPatientData } from "@components/organisms/PatientTable"
import { getAllPatients } from "@helpers/apis/patient"
import Loading from "@components/atoms/Loading"
import ErrorPage from "@pages/Error/ErrorPage"
import { Patient } from "@helpers/types"
import PatientFilter from "@components/organisms/PatientFilter"
import Title from "@components/atoms/Title"
import addIcon from "@assets/icons/add.svg"
import { useNavigate } from "react-router-dom"

type Props = {}

export default function PatientPage({}: Props) {
  const navigator = useNavigate()
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  })
  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />
  const patients = data ? data : []
  return (
    <div className="px-24">
      <div className="mt-16"></div>
      <PatientFilter />
      <div className="container mx-auto my-10 flex justify-between">
        <Title text="Liste des patients" />
        <img
          className="size-11 cursor-pointer"
          src={addIcon}
          onClick={() => navigator("/medecin/addPatient")}
        />
      </div>
      <PatientTable
        refetch={refetch}
        data={transformPatientToTablePatient(patients)}
      />
    </div>
  )
}

function transformPatientToTablePatient(p: Patient[]): TPatientData[] {
  let patients: TPatientData[] = []
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
