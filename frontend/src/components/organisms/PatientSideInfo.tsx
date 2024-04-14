import { updatePatient } from "@helpers/apis/patient"
import { useAuth } from "@helpers/auth/auth"
import { getAge } from "@helpers/personInfo"
import { Patient, UserRole } from "@helpers/types"
import { useState } from "react"

type Props = {
  patient: Patient
}

export default function PatientSideInfo({ patient }: Props) {
  const { user } = useAuth()
  const [comment, setComment] = useState(patient.comment)
  return (
    <div className="bg-dark-gray bg-opacity-50 h-screen px-9 pt-20 w-full">
      <div>
        <p className="text-primary-blue font-bold text-2xl ">PATIENT:</p>
        <p className="text-primary-blue font-medium pt-2 text-xl ">
          {patient.firstName + " " + patient.lastName}
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
          {user?.role === UserRole.MEDECIN ? (
            <textarea
              className="bg-primary-gray bg-opacity-30 w-96 rounded-lg py-2 px-2 focus:outline-secondary-blue shadow"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={() => {
                if (comment) updatePatient(patient.id, { comment })
              }}
            />
          ) : (
            <p>{comment}</p>
          )}
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
