import DateInput from "@components/atoms/DateInput"
import OptionInput from "@components/atoms/OptionInput"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import Title from "@components/atoms/Title"
import LabledInput from "@components/molecules/LabledInput"
import { handleError } from "@helpers/apis"
import { addPatient } from "@helpers/apis/patient"
import { getAge, getBodySurf, getClairance } from "@helpers/personInfo"
import { Option } from "@helpers/types"
import {
  isEmpty,
  isFloat,
  isInteger,
  isOnlyLetter,
  isPositif,
  isDateInPast,
} from "@helpers/validation"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type TData = {
  DMI: number
  index: number
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
  { label: "mdrd", value: "mdrd" },
  { label: "cockroft", value: "cockroft" },
]

const matrimonialOptions: Option<string>[] = [
  { label: "marié", value: "marié" },
  { label: "célibataire", value: "célibataire" },
]

const genderOptions: Option<string>[] = [
  { label: "homme", value: "homme" },
  { label: "femme", value: "femme" },
]

export default function AddPatient({}: Props) {
  const [data, setData] = useState<TData>({
    DMI: 0,
    index: 0,
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
  const [pageN, setPageN] = useState<1 | 2>(1)
  return (
    <div>
      {pageN === 1 ? (
        <AddPatientPage1 data={data} setData={setData} setPageN={setPageN} />
      ) : (
        <AddPatientPage2 data={data} setData={setData} setPageN={setPageN} />
      )}
    </div>
  )
}

type PageProps = {
  data: TData
  setData: React.Dispatch<React.SetStateAction<TData>>
  setPageN: React.Dispatch<React.SetStateAction<1 | 2>>
}

function AddPatientPage1({ data, setData, setPageN }: PageProps) {
  const navigator = useNavigate()
  function verif(): boolean {
    if (!data.DMI) {
      toast.error(" Veuillez saisir le DMI ")
      return false
    }
    if (!isPositif(data.DMI) || !isInteger(data.DMI)) {
      toast.error("Le DMI doit etre un entier positif ")
      return false
    }
    if (!data.index) {
      toast.error(" Veuillez saisir l'index ")
      return false
    }
    if (!isPositif(data.index) || !isInteger(data.index)) {
      toast.error("L'index doit etre un entier positif")
      return false
    }
    if (isEmpty(data.lastName)) {
      toast.error("Le nom est obligatoire")
      return false
    }
    if (!isOnlyLetter(data.lastName)) {
      toast.error("Le nom doit contenir seulement des lettres ")
      return false
    }
    if (isEmpty(data.firstName)) {
      toast.error("Le prenom est obligatoire")
      return false
    }
    if (!isOnlyLetter(data.firstName)) {
      toast.error("Le prenom doit contenir seulement des lettres ")
      return false
    }

    if (isEmpty(data.gender)) {
      toast.error("Selectionner un genre")
      return false
    }
    if (isEmpty(data.birthDate)) {
      toast.error("Selectionner Date de naissance")
      return false
    }
    if (!isDateInPast(data.birthDate)) {
      toast.error("Veuillez selectionner un date valid")
      return false
    }
    return true
  }

  return (
    <div>
      <div className="container mx-auto my-16">
        <Title text="Données du patient" />
      </div>
      <div className="container mx-auto flex justify-around">
        <div className="space-y-9">
          <LabledInput
            text="DMI"
            value={String(data.DMI)}
            setValue={(value: string) =>
              setData({ ...data, DMI: Number(value) })
            }
          />
          <LabledInput
            text="Index"
            value={String(data.index)}
            setValue={(value: string) =>
              setData({ ...data, index: Number(value) })
            }
          />
          <LabledInput
            text="Nom"
            value={data.lastName}
            setValue={(value: string) => setData({ ...data, lastName: value })}
          />
          <LabledInput
            text="Prenom"
            value={data.firstName}
            setValue={(value: string) => setData({ ...data, firstName: value })}
          />
        </div>
        <div className="space-y-9">
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
            <label className="block mb-2 text-2xl">Date naissance</label>
            <DateInput
              className="w-96 py-3"
              value={data.birthDate}
              setValue={(value: string) =>
                setData({ ...data, birthDate: value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-2xl">commentaire</label>
            <textarea
              className="bg-primary-gray w-96 rounded-lg py-2 px-2 focus:outline-secondary-blue shadow-md"
              value={data.comment}
              onChange={(e) => setData({ ...data, comment: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-14 gap-36">
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

function AddPatientPage2({ data, setData, setPageN }: PageProps) {
  const navigator = useNavigate()
  function verif(): boolean {
    if (!data.weight) {
      toast.error("Veuillez saisir le poids")
      return false
    }
    if (!isPositif(data.weight) || !isFloat(data.weight)) {
      toast.error("Le poids doit etre un decimal positif")
      return false
    }
    if (!data.height) {
      toast.error("Veuillez saisir la taille")

      return false
    }
    if (!isPositif(data.height) || !isFloat(data.weight)) {
      toast.error("La taille doit etre un decimal positif")
      return false
    }
    if (data.bodySurface > 2) {
      toast.error("La surface corporelle doit etre inferieure de 2")
      return false
    }
    if (!data.creatinine) {
      toast.error("Veuillez saisir la creatine")

      return false
    }
    if (!isPositif(data.creatinine) || !isFloat(data.creatinine)) {
      toast.error("La creatine doit etre un decimal positif")
      return false
    }
    if (!data.clairanceFormula) {
      toast.error("Veuillez selectionner la formule clairance")

      return false
    }

    return true
  }
  useEffect(() => {
    setData({ ...data, bodySurface: getBodySurf(data.weight, data.height) })
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
      <div className="container mx-auto my-20">
        <Title text="Informtions Cliniques" />
      </div>
      <div className="container mx-auto flex justify-around">
        <div className="space-y-9">
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
          <LabledInput
            text="Surface corporelle (m²)"
            value={String(data.bodySurface)}
            setValue={(value: string) =>
              setData({ ...data, bodySurface: Number(value) })
            }
            isNumber={true}
          />
        </div>
        <div className="space-y-9">
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
      <div className="container mx-auto flex justify-center mt-28 gap-36">
        <SecondaryBtn text="Précédent" clickFn={() => setPageN(1)} />
        <PrimaryBtn
          text="Ajouter"
          clickFn={async () => {
            try {
              if (verif()) {
                await addPatient(data)
                navigator("/medecin")
              }
            } catch (e) {
              toast.error(handleError(e))
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
      <label className="block mb-2 text-2xl">{text}</label>
      <OptionInput
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}
