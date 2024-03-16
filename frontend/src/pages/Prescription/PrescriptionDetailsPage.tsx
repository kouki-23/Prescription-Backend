import Loading from "@components/atoms/Loading"
import { getPrescriptionById } from "@helpers/apis/prescription"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import backIcon from "@assets/icons/back.svg"
import { PatientData, Prescription } from "@helpers/types"
import Title from "@components/atoms/Title"
import { useEffect, useMemo, useState } from "react"
import { getAge } from "@helpers/personInfo"
import addIcon from "@assets/icons/add.svg"
import listIcon from "@assets/icons/list.svg"
import PrepMoleculeTable from "@components/organisms/PrepMoleculeTable"
import editIcon from "@assets/icons/edit.svg"
import checkIcon from "@assets/icons/CheckIcon.svg"
import TextInput from "@components/atoms/TextInput"
import { toast } from "react-toastify"
import { updatePatient } from "@helpers/apis/patient"
import { diffObjects } from "@helpers/utils"

type Props = {}

export default function PrescriptionDetailsPage({}: Props) {
  const { id } = useParams()
  const navigator = useNavigate()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prescription", id],
    queryFn: () => getPrescriptionById(Number(id)),
  })
  const [prescription, setPrescription] = useState<Prescription | undefined>(
    undefined,
  )
  const [selectedCure, setSelectedCure] = useState(0)
  useEffect(() => {
    setPrescription(data?.data)
  }, [data])
  if (isLoading) return <Loading />
  if (error) return <ErrorPage cause={error.message} />
  return (
    <div className="px-8">
      <img
        className="cursor-pointer py-5"
        src={backIcon}
        onClick={() => navigator(-1)}
      />
      {prescription && (
        <div>
          <div className="flex gap-24">
            <PrescriptionInfoCard
              prescription={prescription}
              selectedCure={selectedCure}
              setSelectedCure={setSelectedCure}
            />
            <PatientInfoCard
              patient={prescription.patient}
              setPatient={(p: PatientData) =>
                setPrescription({ ...prescription, patient: p })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 my-8">
              <Title className="font-semibold" text="Produits" />
              <span className="text-2xl font-semibold text-primary-blue opacity-85">
                Cure {selectedCure + 1}
              </span>
            </div>
            <div className="flex gap-2">
              {/*<PrimaryBtn className="p-1 text-sm" text="Enregistrer" />*/}
              <img className="size-8" src={listIcon} />
              <img className="size-8" src={addIcon} />
            </div>
          </div>
          <div>
            <PrepMoleculeTable cure={prescription.cures[selectedCure]} />
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
    <div className="p-4 px-10 bg-gray-table shadow-lg w-full rounded-3xl">
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

function PatientInfoCard({
  patient,
  setPatient,
}: {
  patient: PatientData
  setPatient: (p: PatientData) => void
}) {
  const [updateOldPatient, setUpdateOldPatient] = useState(false)
  let oldPatient = useMemo(() => patient, [updateOldPatient])
  const patientMutation = useMutation({
    mutationKey: ["patient", patient.id],
    mutationFn: () =>
      updatePatient(patient.id, diffObjects(patient, oldPatient)),
    onError: () => {
      toast.error("Erreur survenue")
      setPatient(oldPatient)
    },
    onSuccess: () => {
      toast.success("Mis à jour avec succès")
      setUpdateOldPatient(!updateOldPatient)
    },
  })
  return (
    <div className="relative p-4 px-6 bg-gray-table shadow-lg w-full rounded-3xl">
      <div className="flex items-center gap-6">
        <Title className="text-3xl font-semibold" text="Patient:" />
        <span className="text-xl text-primary-blue font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 py-4 items-center">
        <InfoText label="DMI" value={String(patient.DMI)} />
        <InfoText
          label="Age"
          value={`${getAge(new Date(patient.birthDate)).toString()} Ans`}
        />
        <InfoText label="Genre" value={patient.gender} />
        <InfoText
          label="Taille"
          value={String(patient.height)}
          setValue={(value) =>
            setPatient({ ...patient, height: Number(value) })
          }
          unite={"cm"}
          editFn={() => patientMutation.mutate()}
          isNumber={true}
        />
        <InfoText
          label="Creatine"
          value={String(patient.creatinine)}
          setValue={(value) =>
            setPatient({ ...patient, creatinine: Number(value) })
          }
          editFn={() => patientMutation.mutate()}
          isNumber={true}
        />
        <InfoText
          label="Poids"
          value={String(patient.weight)}
          setValue={(value) =>
            setPatient({ ...patient, weight: Number(value) })
          }
          unite={"kg"}
          editFn={() => patientMutation.mutate()}
          isNumber={true}
        />
        <InfoText label="Formule" value={patient.clairanceFormula} />
        <InfoText label="Clcr" value={`${patient.clairance} ml/min`} />
        <InfoText
          label="SC"
          value={String(patient.bodySurface)}
          setValue={(value) =>
            setPatient({ ...patient, bodySurface: Number(value) })
          }
          editFn={() => patientMutation.mutate()}
          isNumber={true}
        />
      </div>
    </div>
  )
}

function InfoText({
  label,
  value,
  unite,
  editFn,
  setValue,
  isNumber,
}: {
  label: string
  value: string
  unite?: string
  editFn?: () => void
  setValue?: (s: string) => void
  isNumber?: boolean
}) {
  const [editMode, setEditMode] = useState(false)
  return (
    <div className="flex gap-3 items-center py-1 showImage">
      <span>{label}:</span>
      {editFn && setValue && editMode ? (
        <TextInput
          className="w-full"
          value={value}
          setValue={setValue}
          isNumber={isNumber}
        />
      ) : (
        <span className="text-secondary-blue">
          {value + (unite ? " " + unite : "")}
        </span>
      )}
      {editFn &&
        (!editMode ? (
          <img
            className="size-4 opacity-80 cursor-pointer hidden"
            src={editIcon}
            onClick={() => setEditMode(true)}
          />
        ) : (
          <img
            className="size-4 opacity-80 cursor-pointer"
            src={checkIcon}
            onClick={() => {
              editFn()
              setEditMode(false)
            }}
          />
        ))}
    </div>
  )
}