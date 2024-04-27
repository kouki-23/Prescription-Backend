import DateInput from "@components/atoms/DateInput"
import OptionInput from "@components/atoms/OptionInput"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import Title from "@components/atoms/Title"
import LabledInput from "@components/molecules/LabledInput"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { handleError } from "@helpers/apis"
import {
  addPatient,
  getPatientById,
  updatePatient,
} from "@helpers/apis/patient"
import { getAge, getBodySurf, getClairance } from "@helpers/personInfo"
import { Option, Patient } from "@helpers/types"
import {
  isEmpty,
  isFloat,
  isOnlyLetterWithSpaces,
  isPositif,
  isDateInPast,
} from "@helpers/validation"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

type TData = {
  DMI: string
  index: string
  firstName: string
  lastName: string
  gender: string
  matrimonial: string
  birthDate: string
  weight: number
  height: number
  bodySurface: number
  creatinine: number
  clairanceFormula: string
  clairance: number
  comment?: string
}

type Props = {}

const formuleClairanceOptions: Option<string>[] = [
  { label: "MRDR", value: "MDRD" },
  { label: "Cockroft", value: "Cockroft" },
]

const matrimonialOptions: Option<string>[] = [
  { label: "Marié", value: "Marié" },
  { label: "Célibataire", value: "Célibataire" },
  { label: "Veuf", value: "Veuf" },
]

const genderOptions: Option<string>[] = [
  { label: "Homme", value: "Homme" },
  { label: "Femme", value: "Femme" },
]

export default function AddPatient({}: Props) {
  const [searchParams, _] = useSearchParams()
  const patientId = searchParams.get("patientid")
  const editMode = !!patientId
  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(Number(patientId)),
    enabled: editMode,
  })
  const [data, setData] = useState<TData>({
    DMI: "",
    index: "",
    firstName: "",
    lastName: "",
    gender: "",
    matrimonial: "",
    birthDate: "",
    weight: 0,
    height: 0,
    bodySurface: 0,
    creatinine: 0,
    clairanceFormula: "",
    clairance: 0,
  })
  useEffect(() => {
    if (editMode && patient) {
      setData({
        DMI: patient.data.DMI,
        index: patient.data.index,
        firstName: patient.data.firstName,
        lastName: patient.data.lastName,
        gender: patient.data.gender,
        matrimonial: patient.data.matrimonial,
        birthDate: patient.data.birthDate,
        weight: Number(patient.data.weight),
        height: Number(patient.data.height),
        bodySurface: Number(patient.data.bodySurface),
        creatinine: Number(patient.data.creatinine),
        clairance: Number(patient.data.clairance),
        clairanceFormula: patient.data.clairanceFormula,
      })
    }
  }, [patient])
  const [pageN, setPageN] = useState<1 | 2>(1)
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  return (
    <div className="px-24">
      {pageN === 1 ? (
        <AddPatientPage1 data={data} setData={setData} setPageN={setPageN} />
      ) : (
        <AddPatientPage2
          data={data}
          setData={setData}
          setPageN={setPageN}
          original={patient ? patient.data : undefined}
        />
      )}
    </div>
  )
}

type PageProps = {
  data: TData
  setData: React.Dispatch<React.SetStateAction<TData>>
  setPageN: React.Dispatch<React.SetStateAction<1 | 2>>
  original?: Patient
}

function AddPatientPage1({ data, setData, setPageN }: PageProps) {
  const navigator = useNavigate()
  function verif(): boolean {
    if (!data.DMI) {
      toast.error(" Veuillez saisir le DMI ")
      return false
    }
    if (!data.index) {
      toast.error(" Veuillez saisir l'index ")
      return false
    }
    if (isEmpty(data.lastName)) {
      toast.error("Le nom est obligatoire")
      return false
    }
    if (!isOnlyLetterWithSpaces(data.lastName)) {
      toast.error("Le nom doit contenir seulement des lettres ")
      return false
    }
    if (isEmpty(data.firstName)) {
      toast.error("Le prénom est obligatoire")
      return false
    }
    if (!isOnlyLetterWithSpaces(data.firstName)) {
      toast.error("Le prénom doit contenir seulement des lettres ")
      return false
    }

    if (isEmpty(data.gender)) {
      toast.error("Sélectionner un genre")
      return false
    }
    if (isEmpty(data.birthDate)) {
      toast.error("Selectionner Date de naissance")
      return false
    }

    if (isEmpty(data.matrimonial)) {
      toast.error("Selectionner etat civil")
      return false
    }

    if (!isDateInPast(data.birthDate)) {
      toast.error("Veuillez selectionner une date valide")
      return false
    }

    return true
  }

  return (
    <div>
      <div className="container mx-auto my-12">
        <Title text="Données du patient" />
      </div>
      <div className="container mx-auto flex justify-around">
        <div className="space-y-8">
          <LabledInput
            text="DMI"
            value={data.DMI}
            setValue={(value: string) => setData({ ...data, DMI: value })}
          />
          <LabledInput
            text="Index"
            value={data.index}
            setValue={(value: string) => setData({ ...data, index: value })}
          />
          <LabledInput
            text="Nom"
            value={data.lastName}
            setValue={(value: string) => setData({ ...data, lastName: value })}
          />
          <LabledInput
            text="Prénom"
            value={data.firstName}
            setValue={(value: string) => setData({ ...data, firstName: value })}
          />
        </div>
        <div className="space-y-8">
          <LabelOption
            text="Genre"
            selected={
              data.gender ? { label: data.gender, value: data.gender } : null
            }
            setSelected={(selected) =>
              setData({ ...data, gender: selected.value })
            }
            options={genderOptions}
          />
          <LabelOption
            text="Etat Civil"
            selected={
              data.matrimonial
                ? { label: data.matrimonial, value: data.matrimonial }
                : null
            }
            setSelected={(selected) =>
              setData({ ...data, matrimonial: selected.value })
            }
            options={matrimonialOptions}
          />
          <div>
            <label className="block mb-2 text-xl">Date de naissance</label>
            <DateInput
              className="w-96"
              value={data.birthDate}
              setValue={(value: string) =>
                setData({ ...data, birthDate: value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-xl">Commentaire</label>
            <textarea
              className="bg-primary-gray w-96 rounded-lg py-2 px-2 focus:outline-secondary-blue shadow-md"
              value={data.comment}
              onChange={(e) => setData({ ...data, comment: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-12 gap-36">
        <SecondaryBtn text="Annuler" clickFn={() => navigator(-1)} />
        <PrimaryBtn
          text="Suivant"
          clickFn={() => {
            if (verif()) setPageN(2)
          }}
        />
      </div>
    </div>
  )
}

function AddPatientPage2({ data, setData, setPageN, original }: PageProps) {
  const navigator = useNavigate()
  const [bodySurf, setBodySurf] = useState<number>(0)

  function verif(): boolean {
    if (!data.weight) {
      toast.error("Veuillez saisir le poids")
      return false
    }
    if (!isPositif(data.weight) || !isFloat(data.weight)) {
      toast.error("Le poids doit être un decimal positif")
      return false
    }
    if (!data.height) {
      toast.error("Veuillez saisir la taille")

      return false
    }
    if (!isPositif(data.height) || !isFloat(data.weight)) {
      toast.error("La taille doit être un decimal positif")
      return false
    }
    if (data.bodySurface > 2) {
      toast.error("La surface corporelle doit être inferieure a 2")
      return false
    }
    if (!data.creatinine) {
      toast.error("Veuillez saisir la creatinine")

      return false
    }
    if (!isPositif(data.creatinine) || !isFloat(data.creatinine)) {
      toast.error("La creatine doit être un decimal positif")
      return false
    }
    if (!data.clairanceFormula) {
      toast.error("Veuillez selectionner de la formule clairance")
      return false
    }

    return true
  }
  const addMut = useMutation({
    mutationKey: ["patient", "add"],
    mutationFn: async () => {
      if (!addMut.isPending)
        await addPatient({ ...data, bodySurface: bodySurf })
    },
    onError: (e) => {
      toast.error(handleError(e))
    },
    onSuccess: () => {
      navigator("/medecin")
      toast.success("patient ajouter avec succès")
    },
  })
  const updateMut = useMutation({
    mutationFn: async () => {
      if (!addMut.isPending)
        await updatePatient(original!.id, { ...data, bodySurface: bodySurf })
    },
    onError: (e) => {
      toast.error(handleError(e))
    },
    onSuccess: () => {
      navigator("/medecin")
      toast.success("patient modifie avec succès")
    },
  })

  useEffect(() => {
    let newBodySurface = getBodySurf(data.weight, data.height)
    setBodySurf(newBodySurface > 2 ? 2 : newBodySurface)
  }, [data.height, data.weight])

  useEffect(() => {
    setData({
      ...data,
      clairance: getClairance(
        data.clairanceFormula,
        data.gender,
        data.creatinine,
        getAge(new Date(data.birthDate)),
        data.weight,
      ),
    })
  }, [
    data.clairanceFormula,
    data.gender,
    data.creatinine,
    data.birthDate,
    data.weight,
  ])

  return (
    <div>
      <div className="container mx-auto my-14">
        <Title text="Informtions Cliniques" />
      </div>
      <div className="container mx-auto flex justify-around">
        <div className="space-y-8">
          <LabledInput
            text="Poids (Kg)"
            value={String(data.weight)}
            setValue={(value: string) =>
              setData({ ...data, weight: Number(value) })
            }
            isNumber={true}
          />
          <LabledInput
            text="Taille (cm)"
            value={String(data.height)}
            setValue={(value: string) =>
              setData({ ...data, height: Number(value) })
            }
            isNumber={true}
          />
          <div>
            <LabledInput
              text="Surface corporelle (m²)"
              value={String(bodySurf)}
              setValue={() => {}}
              isNumber={true}
              disabled={true}
            />
            {getBodySurf(data.weight, data.height) > 2 && (
              <p className="text-orange-shade">la SC dépasse 2</p>
            )}
          </div>
        </div>
        <div className="space-y-8">
          <LabledInput
            text="Créatinine (µmol/l)"
            value={String(data.creatinine)}
            setValue={(value: string) =>
              setData({ ...data, creatinine: Number(value) })
            }
            isNumber={true}
          />
          <LabelOption
            text="Formule Clairance"
            selected={
              data.clairanceFormula
                ? { label: data.clairanceFormula, value: data.clairanceFormula }
                : null
            }
            setSelected={(selected) => {
              setData({ ...data, clairanceFormula: selected.value })
            }}
            options={formuleClairanceOptions}
          />
          <LabledInput
            text="Clairance (ml/min)"
            value={String(data.clairance)}
            setValue={(value: string) =>
              setData({ ...data, clairance: Number(value) })
            }
            disabled={true}
            isNumber={true}
          />
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-16 gap-36">
        <SecondaryBtn text="Précédent" clickFn={() => setPageN(1)} />
        <PrimaryBtn
          text="Ajouter"
          clickFn={async () => {
            if (verif()) {
              if (original) {
                updateMut.mutate()
              } else {
                addMut.mutate()
              }
            }
          }}
        />
      </div>
    </div>
  )
}

type OptionProps = {
  text: string
  selected: Option<string> | null
  setSelected: (s: Option<string>) => void
  options: Option<string>[]
}

function LabelOption({ text, selected, options, setSelected }: OptionProps) {
  return (
    <div>
      <label className="block mb-2 text-xl">{text}</label>
      <OptionInput
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}
