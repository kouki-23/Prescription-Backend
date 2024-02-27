import TextInput from "@components/atoms/TextInput"
import LabledInput from "../molecules/LabledInput"
import DateInput from "@components/atoms/DateInput"

type Props = {}

export default function PatientFilter({}: Props) {
  return (
    <div className="container mx-auto flex items-center justify-center gap-7 my-20 max-lg:flex-col">
      <LabeledFilter label="DMI" />
      <LabeledFilter label="Nom" />
      <div className="space-x-4">
        <span>Date naissance</span>
        <DateInput />
      </div>
      <LabeledFilter label="Genre" />
    </div>
  )
}

function LabeledFilter({ label }: { label: string }) {
  return (
    <div className="space-x-4">
      <span>{label}</span>
      <TextInput />
    </div>
  )
}
