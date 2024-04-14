import { useQuery } from "@tanstack/react-query"
import PatientTable, { TPatientData } from "@components/organisms/PatientTable"
import { getAllPatients } from "@helpers/apis/patient"
import ErrorPage from "@pages/Error/ErrorPage"
import { Patient, UserRole } from "@helpers/types"
import PatientFilter from "@components/organisms/PatientFilter"
import Title from "@components/atoms/Title"
import addIcon from "@assets/icons/person-add.svg"
import { useNavigate } from "react-router-dom"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { useState } from "react"
import { ColumnFilter } from "@tanstack/react-table"
import { useAuth } from "@helpers/auth/auth"

export type Tfilters = {
  DMI: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
}

type Props = {}

export default function PatientPage({}: Props) {
  const navigator = useNavigate()
  const { user } = useAuth()

  const [filters, setFilters] = useState<Tfilters>({
    DMI: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
  })

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  })
  if (!user) return <></>
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  return (
    <div className="px-24">
      <div className="mt-16"></div>
      <PatientFilter filters={filters} setFilters={setFilters} />
      <div className="container mx-auto my-10 flex justify-between">
        <Title text="Liste des patients" />
        {user?.role === UserRole.MEDECIN && (
          <div className="flex gap-2 items-center">
            <img
              className="size-10 cursor-pointer"
              src={addIcon}
              onClick={() => navigator("/medecin/addPatient")}
              alt="ajouter patient"
            />
          </div>
        )}
      </div>
      <PatientTable
        refetch={refetch}
        data={data ? transformPatientToTablePatient(data) : []}
        filters={transformFilter(filters)}
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

type FilterObject = {
  [key: string]: string | undefined
}

export function transformFilter(filter: Tfilters) {
  return Object.keys(filter).map(
    (v) =>
      ({
        id: v,
        value: (filter as FilterObject)[v] as any,
      } as ColumnFilter),
  )
}
