import {
  getPrescriptionById,
  updateCureStartDate,
  updatePrescription,
} from "@helpers/apis/prescription"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import backIcon from "@assets/icons/back.svg"
import { Patient, Prescription, UserRole } from "@helpers/types"
import Title from "@components/atoms/Title"
import { useEffect, useMemo, useState } from "react"
import { getAge, getBodySurf, getClairance } from "@helpers/personInfo"
import PrepMoleculeTable from "@components/organisms/PrepMoleculeTable"
import editIcon from "@assets/icons/edit.svg"
import checkIcon from "@assets/icons/CheckIcon.svg"
import TextInput from "@components/atoms/TextInput"
import { toast } from "react-toastify"
import { updatePatient } from "@helpers/apis/patient"
import { diffObjects, getDate } from "@helpers/utils"
import LoadingInterface from "@components/organisms/LoadingInterface"
import Model from "@components/atoms/Model"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import DateInput from "@components/atoms/DateInput"
import { useAuth } from "@helpers/auth/auth"

type Props = {}

export default function PrescriptionDetailsPage({}: Props) {
  const { id } = useParams()
  const navigator = useNavigate()
  const { isLoading, error, data, refetch } = useQuery({
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
  if (isLoading) return <LoadingInterface />
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
          <div className="container mx-auto flex gap-24">
            <PrescriptionInfoCard
              prescription={prescription}
              selectedCure={selectedCure}
              setSelectedCure={setSelectedCure}
              refetch={refetch}
            />
            <PatientInfoCard
              patient={prescription.patient}
              setPatient={(p: Patient) =>
                setPrescription({ ...prescription, patient: p })
              }
            />
          </div>
          <div>
            <PrepMoleculeTable
              selectedCure={selectedCure}
              cure={prescription.cures[selectedCure]}
              patient={prescription.patient}
              setCure={(c) => {
                let newCures = [...prescription.cures]
                newCures[selectedCure] = c
                setPrescription({ ...prescription, cures: newCures })
              }}
              intercure={prescription.intercure}
            />
          </div>
          <div className="container mx-auto my-10">
            <Title
              className="text-3xl font-semibold mb-2"
              text="Commentaire prescription"
            />
            <textarea
              className="w-full bg-primary-gray rounded-lg py-2 px-4 focus:outline-secondary-blue"
              onChange={(e) =>
                setPrescription({ ...prescription, comment: e.target.value })
              }
              onBlur={() =>
                updatePrescription(prescription.id, {
                  comment: prescription.comment,
                })
              }
            ></textarea>
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
  refetch,
}: {
  prescription: Prescription
  selectedCure: number
  setSelectedCure: (n: number) => void
  refetch: () => void
}) {
  const [date, setDate] = useState(
    new Date(prescription.cures[selectedCure].startDate),
  )
  const [confirmUpdateCure, setConfirmUpdateCure] = useState(false)

  useEffect(
    () => setDate(new Date(prescription.cures[selectedCure].startDate)),
    [prescription.cures[selectedCure], selectedCure],
  )

  const updateCureStartDateMut = useMutation({
    mutationKey: ["prescription", "update", "cure", "date", prescription.id],
    mutationFn: ({ newDate, cascade }: { newDate: Date; cascade: boolean }) =>
      updateCureStartDate(
        prescription.id,
        prescription.cures[selectedCure].id,
        newDate,
        cascade,
      ),
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      refetch()
    },
  })

  return (
    <>
      <ConfirmCureDateUpdateModel
        isOpen={confirmUpdateCure}
        setIsOpen={setConfirmUpdateCure}
        confirmFn={(cascade) =>
          updateCureStartDateMut.mutate({ newDate: date, cascade })
        }
      />
      <div className="p-4 px-10 bg-gray-table shadow-lg w-full rounded-3xl">
        <Title
          className="text-3xl mb-3 font-semibold"
          text="Prescription / Cure"
        />
        <div className="grid grid-cols-2">
          <InfoText
            label="N° Cure"
            value={`${String(selectedCure + 1)} / ${prescription.cures.length}`}
          />
          <InfoText
            label="Status"
            value={prescription.cures[selectedCure].state}
          />
          <InfoText label="Date de début" value={getDate(date)} />
          <InfoText label="Protocole" value={prescription.protocolName} />
        </div>
        <InfoText label="Intercure" value={`${prescription.intercure} jours`} />
        <div className="space-x-5 flex items-center">
          <span>Navigation entre les cures :</span>
          <div className="flex flex-wrap gap-3">
            {prescription.cures.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelectedCure(i)}
                className={`size-9 border-2 border-secondary-blue flex justify-center items-center rounded-full cursor-pointer ${
                  i === selectedCure ? "bg-secondary-blue bg-opacity-30" : ""
                }`}
              >
                <span className="">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ConfirmCureDateUpdateModel({
  isOpen,
  setIsOpen,
  confirmFn,
}: {
  isOpen: boolean
  setIsOpen: (b: boolean) => void
  confirmFn: (cascade: boolean) => void
}) {
  const [cascade, setCascade] = useState(false)
  return (
    <Model onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <Title className="mb-4" text="Confirmer" />
      <div className="flex items-center">
        <input
          className="size-5"
          type="checkbox"
          checked={cascade}
          onChange={(e) => setCascade(e.target.checked)}
        />
        <p className="py-6">
          Voulez-vous propager ce changement de date a le reste des cures ?
        </p>
      </div>
      <div className="space-x-6">
        <SecondaryBtn
          className="px-8 py-3"
          clickFn={() => setIsOpen(false)}
          text="Annuler"
        />
        <PrimaryBtn
          className="px-8 py-3"
          clickFn={() => confirmFn(cascade)}
          text="Confirmer"
        />
      </div>
    </Model>
  )
}

function PatientInfoCard({
  patient,
  setPatient,
}: {
  patient: Patient
  setPatient: (p: Patient) => void
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
      toast.success("Mise à jour avec succès")
      setUpdateOldPatient(!updateOldPatient)
    },
  })
  useEffect(() => {
    let newBodySurface = getBodySurf(patient.weight, patient.height)
    patient.bodySurface = newBodySurface > 2 ? 2 : newBodySurface
    setPatient(patient)
  }, [patient.weight, patient.height])

  useEffect(() => {
    setPatient({
      ...patient,
      clairance: getClairance(
        patient.clairanceFormula,
        patient.gender,
        patient.creatinine,
        getAge(new Date(patient.birthDate)),
        patient.weight,
      ),
    })
  }, [patient.clairanceFormula, patient.creatinine, patient.weight])
  return (
    <div className="relative p-4 px-6 bg-gray-table shadow-lg w-full rounded-3xl">
      <div className="flex justify-between items-center pr-5">
        <div className="flex items-center gap-6">
          <Title className="text-3xl font-semibold" text="Patient:" />
          <span className="text-xl text-primary-blue font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
        </div>
        <span className="text-xl text-primary-blue font-medium">
          {patient.DMI}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 py-4 items-center">
        <InfoText
          label="Age"
          value={`${getAge(new Date(patient.birthDate)).toString()} Ans`}
        />
        <InfoText label="Genre" value={patient.gender} />
        <InfoText
          label="FEVG"
          value={String(patient.FEVG ? patient.FEVG : 0)}
          setValue={(value) => setPatient({ ...patient, FEVG: Number(value) })}
          editFn={() => patientMutation.mutate()}
          unite="%"
        />
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
          label="Poids"
          value={String(patient.weight)}
          setValue={(value) =>
            setPatient({ ...patient, weight: Number(value) })
          }
          unite={"kg"}
          editFn={() => patientMutation.mutate()}
          isNumber={true}
        />
        <InfoText
          label="SC"
          value={String(patient.bodySurface)}
          setValue={(value) =>
            setPatient({ ...patient, bodySurface: Number(value) })
          }
          isNumber={true}
          unite="m²"
        />
        <InfoText
          label="Creatine"
          value={String(patient.creatinine)}
          setValue={(value) =>
            setPatient({ ...patient, creatinine: Number(value) })
          }
          editFn={() => patientMutation.mutate()}
          isNumber={true}
          unite="µmol/l"
        />
        <InfoText label="Formule" value={patient.clairanceFormula} />
        <InfoText label="Clcr" value={`${patient.clairance} ml/min`} />
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
  isDate,
}: {
  label: string
  value: string
  unite?: string
  editFn?: () => void
  setValue?: (s: string) => void
  isNumber?: boolean
  isDate?: boolean
}) {
  const { user } = useAuth()
  if (!user) return <></>
  const [editMode, setEditMode] = useState(false)
  return (
    <div className="flex gap-3 items-center py-1 showImage">
      <span>{label}:</span>
      {user.role == UserRole.MEDECIN && editFn && setValue && editMode ? (
        !isDate ? (
          <TextInput
            className="w-full"
            value={value}
            setValue={setValue}
            isNumber={isNumber}
          />
        ) : (
          <DateInput className="w-full" value={value} setValue={setValue} />
        )
      ) : (
        <span className="text-secondary-blue">
          {value + (unite ? " " + unite : "")}
        </span>
      )}
      {user.role == UserRole.MEDECIN &&
        editFn &&
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
