import { getAge } from "@helpers/personInfo"
import { PatientData } from "@helpers/types"

type Props = {
  patient: PatientData
}

export default function PatientSideInfo({ patient }: Props) {
  return (
    <div className="bg-dark-gray bg-opacity-50 h-screen px-9 pt-20 w-full">
      <div>
        <p className="text-primary-blue font-bold text-2xl ">PATIENT:</p>
        <p className="text-primary-blue font-medium pt-2 text-xl ">
          {patient.firstName}
          {patient.lastName}
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-3  gap-5 pt-4">
            <InfoText label="Poids" value={String(patient.weight)} />
            <InfoText label="Taille" value={String(patient.height)} />
            <InfoText
              label="Age"
              value={String(getAge(new Date(patient.birthDate)))}
            />
          </div>
          <InfoText
            label="Surface Corporelle"
            value={String(patient.bodySurface)}
          />
          <p className="text-primary-blue font-medium pt-1">Commentaire:</p>
          <p className="text-light-black font-light py-2">{patient.comment}</p>
        </div>
      </div>
    </div>
  )
}

function InfoText({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex space-x-3">
      <p className="text-primary-blue font-medium ">{label}:</p>
      <p className="text-primary-blue font-light">{value}</p>
    </div>
  )
}
