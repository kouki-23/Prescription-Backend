import DateInput from "@components/atoms/DateInput"
import Loading from "@components/atoms/Loading"
import Model from "@components/atoms/Model"
import OptionInput from "@components/atoms/OptionInput"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import { TPatientData } from "@components/organisms/PatientTable"
import { handleError } from "@helpers/apis"
import {
  CreatePrescriptionData,
  createPrescription,
} from "@helpers/apis/prescription"
import { getAllProtocols } from "@helpers/apis/protocol"
import { useAuth } from "@helpers/auth/auth"
import { Option } from "@helpers/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type Props = {
  patient: TPatientData
  setIsOpen: (b: boolean) => void
  isOpen: boolean
}

export default function AddPrescription({ patient, setIsOpen, isOpen }: Props) {
  const { user } = useAuth()
  const [data, setData] = useState<CreatePrescriptionData>({
    prescriber: user ? user.name : "",
    nbCures: 0,
    clinicalTest: false,
    protocolId: 0,
    startDate: new Date().toISOString().split("T")[0],
    patientId: patient.id,
    serviceType: "",
    comment: "",
  })
  const [step, setStep] = useState<1 | 2 | 3>(1)
  return (
    <Model
      onClose={() => {
        setStep(1)
        setIsOpen(false)
      }}
      isOpen={isOpen}
    >
      <Title className="text-4xl mb-14" text="NOUVELLE PRESCRIPTION" />
      {step === 1 && (
        <Step1
          dataP={data}
          setDataP={setData}
          patient={patient}
          setStep={setStep}
          setIsOpen={setIsOpen}
        />
      )}
      {step === 2 && (
        <Step2 dataP={data} setDataP={setData} setStep={setStep} />
      )}
      {/*step === 3 && <Step3 dataP={data} setStep={setStep} />*/}
    </Model>
  )
}

function PatientInfo({ label, text }: { label: string; text: string }) {
  return (
    <div className="font-medium space-x-2">
      <span>{label}:</span>
      <span className="text-primary-blue font-medium">{text}</span>
    </div>
  )
}

function Step1({
  dataP,
  setDataP,
  patient,
  setStep,
  setIsOpen,
}: {
  dataP: CreatePrescriptionData
  setDataP: (p: CreatePrescriptionData) => void
  patient: TPatientData
  setStep: (step: 1 | 2 | 3) => void
  setIsOpen: (b: boolean) => void
}) {
  return (
    <>
      <div className="flex gap-28">
        <div>
          <PatientInfo
            label="Patient"
            text={patient.firstName + " " + patient.lastName}
          />
          <PatientInfo label="DMI" text={String(patient.DMI)} />
        </div>
        <div>
          <PatientInfo label="Date Naissance" text={patient.birthDate} />
          <PatientInfo label="Genre" text={patient.gender} />
        </div>
      </div>
      <hr className="border-px my-8 border-gray-button border-opacity-50 w-full" />
      <div className="grid grid-cols-2 gap-4 items-center">
        <p>Nom du prescripteur :</p>
        <TextInput
          setValue={(value) => setDataP({ ...dataP, prescriber: value })}
          value={dataP.prescriber}
        />
        <p>Date de la prescription :</p>
        <DateInput
          className="w-45"
          value={dataP.startDate}
          setValue={(value) => setDataP({ ...dataP, startDate: value })}
        />
      </div>
      <div className="flex justify-center mt-16 gap-8">
        <SecondaryBtn text="Annuler" clickFn={() => setIsOpen(false)} />
        <PrimaryBtn text="Suivant" clickFn={() => setStep(2)} />
      </div>
    </>
  )
}

// TODO : remeber to give type to protocol and change option to be of type protocol
function Step2({
  setStep,
  dataP,
  setDataP,
}: {
  setStep: (step: 1 | 2 | 3) => void
  dataP: CreatePrescriptionData
  setDataP: (p: CreatePrescriptionData) => void
}) {
  const navigator = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["protocols"],
    queryFn: getAllProtocols,
  })

  if (isLoading) return <Loading />
  let protocolOptions: Option<number>[] = []
  if (data) {
    protocolOptions = data.data.map((v: any): Option<number> => {
      return { value: v.id, label: v.name }
    })
  }
  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span>Protocol:</span>
          <div>
            <OptionInput
              options={protocolOptions}
              selected={
                dataP.protocolId
                  ? protocolOptions.find((p) => p.value === dataP.protocolId)
                  : null
              }
              setSelected={(selected) => {
                const protocol = data?.data.find(
                  (v: any) => (v.id = selected.value),
                )
                setDataP({
                  ...dataP,
                  protocolId: selected.value,
                  nbCures: protocol.nbCures,
                })
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-12">
          <p>numbre cure :</p>
          <TextInput
            setValue={(value) => setDataP({ ...dataP, nbCures: Number(value) })}
            value={String(dataP.nbCures)}
            isNumber={true}
            className="w-64"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-8">
        <SecondaryBtn text="Précédent" clickFn={() => setStep(1)} />
        <PrimaryBtn
          text="Suivant"
          clickFn={async () => {
            try {
              await createPrescription(dataP)
              navigator(`${dataP.patientId}/prescription`)
            } catch (e) {
              toast.error(handleError(e))
            }
          }}
        />
      </div>
    </>
  )
}

/*function Step3({
  setStep,
  dataP,
}: {
  setStep: (step: 1 | 2 | 3) => void
  dataP: CreatePrescriptionData
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["protocol", dataP.protocolId],
    queryFn: async () => getProtocolWithMolecules(Number(dataP.protocolId)),
  })

  if (isLoading) return <Loading />

  return (
    <div>
      <div className="flex justify-center mt-16 gap-8">
        <SecondaryBtn text="Annuler" clickFn={() => setStep(2)} />
        <PrimaryBtn text="Suivant" clickFn={() => setStep(3)} />
      </div>
    </div>
  )
}*/
