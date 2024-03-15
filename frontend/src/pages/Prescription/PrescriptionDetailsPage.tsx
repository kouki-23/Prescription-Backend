import Loading from "@components/atoms/Loading"
import { getPrescriptionById } from "@helpers/apis/prescription"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import backIcon from "@assets/icons/back.svg"
import { PatientData, Prescription } from "@helpers/types"
import Title from "@components/atoms/Title"
import { useState } from "react"
import { getAge } from "@helpers/personInfo"

type Props = {}

export default function PrescriptionDetailsPage({}: Props) {
  const { id } = useParams()
  const navigator = useNavigate()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prescription", id],
    queryFn: () => getPrescriptionById(Number(id)),
  })
  const [selectedCure, setSelectedCure] = useState(0)

  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div className="px-8">
      <img
        className="cursor-pointer py-5"
        src={backIcon}
        onClick={() => navigator(-1)}
      />
      {data?.data && (
        <div>
          <div className="flex gap-24">
            <PrescriptionInfoCard
              prescription={data.data}
              selectedCure={selectedCure}
              setSelectedCure={setSelectedCure}
            />
            <PatientInfoCard patient={data.data.patient} />
          </div>
        </div>
      )}
    </div>
  )
}

function PrescriptionInfoCard({
  prescription,
  selectedCure,
  setSelectedCure,
}: {
  prescription: Prescription
  selectedCure: number
  setSelectedCure: (n: number) => void
}) {
  return (
    <div className="p-4 px-10 bg-gray-table shadow w-full rounded-3xl">
      <Title
        className="text-3xl mb-3 font-semibold"
        text="Prescription / Cure"
      />
      <div className="grid grid-cols-2">
        <InfoText label="N Cure" value={String(selectedCure + 1)} />
        <InfoText
          label="Status"
          value={prescription.cures[selectedCure].state}
        />
        <InfoText
          label="Date debut"
          value={prescription.cures[selectedCure].startDate}
        />
        <InfoText label="Nbr Cure" value={String(prescription.cures.length)} />
      </div>
      <InfoText label="Protocole" value={prescription.protocol.name} />
      <InfoText
        label="Intercure"
        value={`${prescription.protocol.intercure} jours`}
      />
      <div className="space-x-5 flex items-center">
        <span>Navigation entre les cures :</span>
        <div className="flex gap-5">
          {prescription.cures.map((c) => (
            <div
              onClick={() => setSelectedCure(c.order - 1)}
              className={`size-9 border-2 border-secondary-blue flex justify-center items-center rounded-full cursor-pointer ${
                c.order - 1 === selectedCure
                  ? "bg-secondary-blue bg-opacity-30"
                  : ""
              }`}
            >
              <span className="">{c.order}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PatientInfoCard({ patient }: { patient: PatientData }) {
  return (
    <div className="p-4 px-6 bg-gray-table shadow w-full rounded-3xl">
      <div className="flex items-center gap-6">
        <Title className="text-3xl font-semibold" text="Patient:" />
        <span className="text-xl text-primary-blue font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 py-4 items-center h-5/6">
        <InfoText label="DMI" value={String(patient.DMI)} />
        <InfoText
          label="Age"
          value={`${getAge(new Date(patient.birthDate)).toString()} Ans`}
        />
        <InfoText label="Poids" value={`${patient.weight} kg`} />
        <InfoText label="Taille" value={`${patient.height} cm`} />
        <InfoText label="Creatine" value={patient.creatinine} />
        <InfoText label="Genre" value={patient.gender} />
        <InfoText label="Formule" value={patient.clairanceFormula} />
        <InfoText label="Clcr" value={`${patient.clairance} ml/min`} />
        <InfoText label="Surface Corporelle" value={patient.bodySurface} />
      </div>
    </div>
  )
}

function InfoText({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-x-3 py-1">
      <span>{label}:</span>
      <span className="text-secondary-blue">{value}</span>
    </div>
  )
}
