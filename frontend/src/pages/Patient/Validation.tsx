import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import PatientFilter from "@components/organisms/PatientFilter"
import PatientTable from "@components/organisms/PatientTable"
import { getAllPatients } from "@helpers/apis/patient"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export type Tfilters = {
  DMI: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
}

type Props = {}

export default function ValidationPage({ }: Props) {

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
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div>
      <PatientFilter filters={filters} setFilters={setFilters} />
      <div className="container mx-auto my-10">
        <Title text="Liste des patients" />
      </div>
      {data && <PatientTable data={data} filters={filters} refetch={refetch} />}
    </div>
  )
}
