import DateInput from "@components/atoms/DateInput"
import Loading from "@components/atoms/Loading"
import Model from "@components/atoms/Model"
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
import { useEffect, useState } from "react"
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
    primitif: "",
    histoType: "",
    nbCures: 0,
    clinicalTest: false,
    protocolId: -1,
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
      <Title className="text-4xl" text="NOUVELLE PRESCRIPTION" />
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
      <StepBar />
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
          disabled={true}
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
  useEffect(() => {
    if (data && dataP.protocolId !== -1) {
      const protocol = data.data.find((v: any) => v.id === dataP.protocolId)
      console.log(protocol)
      setDataP({ ...dataP, nbCures: protocol.nbCures })
    }
  }, [dataP.protocolId])
  let protocolOptions: Option<number>[] = []
  if (data) {
    protocolOptions = data.data.map((v: any): Option<number> => {
      return { value: v.id, label: v.name }
    })
  }
  if (isLoading) return <Loading />
  return (
    <>
      <StepBar2 />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 items-center">
          <p>Primitif :</p>
          <TextInput
            className="w-52"
            setValue={(value) => setDataP({ ...dataP, primitif: value })}
            value={dataP.primitif}
          />
          <p>Type Histologique :</p>
          <TextInput
            className="w-52"
            setValue={(value) => setDataP({ ...dataP, histoType: value })}
            value={dataP.histoType}
          />
          <p>Protocole:</p>
          <select
            className="w-52 py-3 px-2 rounded-lg bg-primary-gray"
            onChange={(e) => {
              const selected = e.target.value
              console.log("value" + selected)
              setDataP({
                ...dataP,
                protocolId: Number(selected),
              })
            }}
            value={dataP.protocolId}
          >
            <option value={-1} disabled hidden>
              Sélectionnez
            </option>
            {protocolOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <p>numbre cure :</p>
          <TextInput
            className="w-52"
            setValue={(value) => setDataP({ ...dataP, nbCures: Number(value) })}
            value={String(dataP.nbCures)}
            isNumber={true}
          />
        </div>
        {/*<div>
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
          </div>*/}
        <div className="flex items-center gap-12"></div>
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

function StepBar() {
  return (
    <div className="my-12 relative">
      <span className="absolute left-8 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <span className="absolute left-60 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <div className="flex items-center justify-between space-x-44 text-center">
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-blue text-white-shade font-bold text-lg ">
          ✔
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray mr-0 text-white-shade">
          2
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray mr-1  text-white-shade">
          3
        </span>
      </div>
    </div>
  )
}

function StepBar2() {
  return (
    <div className="my-12 relative">
      <span className="absolute left-8 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <span className="absolute left-60 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <div className="flex items-center justify-between space-x-44 text-center">
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray text-white-shade font-bold text-lg ">
          1
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-blue mr-0 text-white-shade">
          ✔
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray mr-1  text-white-shade">
          3
        </span>
      </div>
    </div>
  )
}

/*function StepBar3() {
  return (
    <div className="my-12 relative">
      <span className="absolute left-8 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <span className="absolute left-60 top-4 w-44 bg-secondary-gray h-[2px]"></span>
      <div className="flex items-center justify-between space-x-44 text-center">
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray text-white-shade font-bold text-lg ">
          1
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-gray mr-0 text-white-shade">
          2
        </span>
        <span className="flex justify-center items-center size-8 rounded-full bg-secondary-blue mr-1  text-white-shade">
          ✔
        </span>
      </div>
    </div>
  )
}*/
