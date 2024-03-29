import TextInput from "@components/atoms/TextInput"
import DateInput from "@components/atoms/DateInput"
import { Tfilters } from "@pages/Patient/ListPatient"

type Props = {
  filters: Tfilters
  setFilters: (filters: Tfilters) => void
}

export default function PatientFilter({ filters, setFilters }: Props) {
  return (
    <div className="container mx-auto flex items-center justify-center gap-7 my-20 max-lg:flex-col">
      <LabeledFilter
        label="DMI"
        value={filters.DMI}
        setValue={(s) => setFilters({ ...filters, DMI: s })}
      />
      <LabeledFilter
        label="Prénom"
        value={filters.firstName}
        setValue={(s) => setFilters({ ...filters, firstName: s })}
      />
      <LabeledFilter
        label="Nom"
        value={filters.lastName}
        setValue={(s) => setFilters({ ...filters, lastName: s })}
      />
      <div className="space-x-2">
        <span>Date naissance</span>
        <DateInput
          className="w-44"
          value={filters.birthDate}
          setValue={(s) => setFilters({ ...filters, birthDate: s })}
        />
      </div>
      <LabeledFilter
        label="Genre"
        value={filters.gender}
        setValue={(s) => setFilters({ ...filters, gender: s })}
      />
    </div>
  )
}

function LabeledFilter({
  label,
  value,
  setValue,
}: {
  label: string
  value: string
  setValue: (s: string) => void
}) {
  return (
    <div className="space-x-2">
      <span>{label}</span>
      <TextInput className="w-44" value={value} setValue={setValue} />
    </div>
  )
}
