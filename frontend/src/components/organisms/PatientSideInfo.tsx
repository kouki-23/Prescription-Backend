import { getAge } from "@helpers/personInfo"

type Props = {
  patient: TPatient
}
export type TPatient = {
  id: number
  DMI: number
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  weight: number
  height: number
  bodySurface: number
  comment: string
}

export default function PatientSideInfo({ patient }: Props) {
  return (
    <div className="bg-dark-gray z-50 w-80 h-screen px-5 pt-16 ">
      <div key={patient.id}>
        <p className="text-primary-blue font-bold text-2xl ">PATIENT:</p>
        <p className="text-primary-blue font-medium pt-2 text-xl ">
          {patient.firstName}
          {patient.lastName}
        </p>
        <div className="grid grid-cols-6 gap-3 relative pt-4">
          <p className="text-primary-blue font-medium ">Poids:</p>
          <p className="text-primary-blue font-light">{patient.weight}</p>
          <p className="text-primary-blue font-medium">Taille:</p>
          <p className="text-primary-blue font-light">{patient.height}</p>
          <p className="text-primary-blue font-medium">Age:</p>
          <p className="text-primary-blue font-light">
            {getAge(new Date(patient.birthDate))}
          </p>
        </div>
        <div className="flex relative  gap-3">
          <p className="text-primary-blue font-medium  pt-1">
            Surface Corporelle:
          </p>
          <p className="text-primary-blue font-light pt-1">
            {patient.bodySurface}
          </p>
        </div>
        <p className="text-primary-blue font-medium  pt-1">Commentaire:</p>
        <p className="text-light-black font-light  pt-2">{patient.comment}</p>
      </div>
    </div>
  )
}
