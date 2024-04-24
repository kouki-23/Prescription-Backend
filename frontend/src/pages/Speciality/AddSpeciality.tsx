import { AdminLabledInput } from "@components/molecules/AdminLabledInput"
import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { Switch } from "@headlessui/react"
import { getAllMolecules } from "@helpers/apis/molecule"
import { Option } from "@helpers/types"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AdminOptionInput from "@components/atoms/AdminOptionInput"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import { toast } from "react-toastify"
import { isEmpty, isFloat, isPositif } from "@helpers/validation"
import { addProduct } from "@helpers/apis/product"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import TextInput from "@components/atoms/TextInput"

type ProductForm = {
  moleculeId: number
  minConcentration: number
  maxConcentration: number
  speciality: string
  dilutionVolume: number
  flacons: {
    dosage: number
    volume: number
  }[]
  lightShelter: boolean
  SensivityPVC: boolean
  conservrationDilutionFridge: boolean
  concervationtionPeriodDilution: number
  conservationReconstitutionFridge: boolean
  isReconstruct: boolean
  solventReconstitution: string
  volumeReconstitution: number
  comment?: string
}

const solvantOptions: Option<string>[] = [
  {
    value: "Eau PPI",
    label: "Eau PPI",
  },
  {
    value: "NaCl 0,9%",
    label: "NaCl 0,9%",
  },
]

export default function AddSpeciality() {
  const navigator = useNavigate()

  const [data, setData] = useState<ProductForm>({
    moleculeId: 0,
    minConcentration: 0,
    maxConcentration: 0,
    speciality: "",
    dilutionVolume: 0,
    flacons: [
      {
        dosage: 0,
        volume: 0,
      },
    ],
    lightShelter: false,
    SensivityPVC: false,
    conservrationDilutionFridge: false,
    concervationtionPeriodDilution: 0,
    conservationReconstitutionFridge: false,
    isReconstruct: false,
    solventReconstitution: "",
    volumeReconstitution: 0,
    comment: "",
  })

  const addProtocolMutation = useMutation({
    mutationKey: ["product", "add"],
    mutationFn: () => addProduct(data),
    onError: () => {
      toast.error("Une erreur s'est produit")
    },
    onSuccess: () => {
      toast.success("La spécialité est ajoutée avec succés")
    },
  })

  const {
    isLoading: isLoadingMolecules,
    error: errorMolecules,
    data: molecules,
  } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })

  const isLoading = isLoadingMolecules
  const error = errorMolecules

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  const moleculesOptions: Option<number>[] = molecules!.map((m) => ({
    value: m.id,
    label: m.name,
  }))

  return (
    <div className="container py-10">
      <Title text="Ajouter spécialité" className="p-6 py-8" />
      <div className="mx-6 flex gap-80">
        <div className="space-y-8">
          <AdminLabelOption
            text="Nom molecule"
            selected={moleculesOptions.find(
              (option) => option.value === data.moleculeId,
            )}
            setSelected={(selected) => {
              setData({
                ...data,
                moleculeId: selected.value,
              })
            }}
            options={moleculesOptions}
          />

          <AdminLabledInput
            text="Concentration Min (mg/ml)"
            value={String(data.minConcentration)}
            setValue={(value: string) =>
              setData({ ...data, minConcentration: Number(value) })
            }
            isNumber={true}
          />
          <AdminLabledInput
            text="Volume Dilution (ml)"
            value={String(data.dilutionVolume)}
            setValue={(value: string) =>
              setData({ ...data, dilutionVolume: Number(value) })
            }
            isNumber={true}
          />
          <LabledSwitch
            label=" Sensibilité PVC"
            enabled={data.SensivityPVC}
            setEnabled={(b) => setData({ ...data, SensivityPVC: b })}
          />
          <LabledSwitch
            label="Abri Lumière"
            enabled={data.lightShelter}
            setEnabled={(b) => setData({ ...data, lightShelter: b })}
          />
          <LabledSwitch
            label="Conservation reconstitution frigo"
            enabled={data.conservationReconstitutionFridge}
            setEnabled={(b) =>
              setData({ ...data, conservationReconstitutionFridge: b })
            }
          />
          <LabledSwitch
            label="Conservation dilution frigo"
            enabled={data.conservrationDilutionFridge}
            setEnabled={(b) =>
              setData({ ...data, conservrationDilutionFridge: b })
            }
          />
          {data.conservrationDilutionFridge && (
            <AdminLabledInput
              text="Délai conservation (jours)"
              value={String(data.concervationtionPeriodDilution)}
              setValue={(s) =>
                setData({ ...data, concervationtionPeriodDilution: Number(s) })
              }
            />
          )}
        </div>
        <div className="space-y-8">
          <AdminLabledInput
            text="Spécialité"
            value={data.speciality}
            setValue={(value: string) =>
              setData({ ...data, speciality: value })
            }
            isNumber={false}
          />
          <AdminLabledInput
            text="Concentration Max (mg/ml)"
            value={String(data.maxConcentration)}
            setValue={(value: string) =>
              setData({ ...data, maxConcentration: Number(value) })
            }
            isNumber={true}
          />
        </div>
      </div>
      <div className="mx-6 my-16 space-y-8">
        <BigSwitch
          option1="prêt à l'emploi"
          option2="à reconstituer"
          enabled={data.isReconstruct}
          setEnabled={(b) => setData({ ...data, isReconstruct: b })}
        />

        {data.isReconstruct && (
          <div className="flex gap-80">
            <AdminLabelOption
              text="Solvant de reconstitution"
              selected={solvantOptions.find(
                (s) => s.value === data.solventReconstitution,
              )}
              setSelected={(s) =>
                setData({ ...data, solventReconstitution: s.value })
              }
              options={solvantOptions}
            />

            <AdminLabledInput
              text="Volume de reconstiturion (ml)"
              value={String(data.volumeReconstitution)}
              setValue={(value: string) =>
                setData({ ...data, volumeReconstitution: Number(value) })
              }
              isNumber={true}
            />
          </div>
        )}
      </div>
      <div className="mx-6 block mb-2  space-y-2">
        <label className="text-xl">Commentaire</label>
        <textarea
          className="w-full h-24 bg-white-shade bg-opacity-50 rounded-lg py-2 px-4 border border-primary-blue border-opacity-20  focus:outline-secondary-blue shadow-none"
          value={data.comment}
          onChange={(e) => setData({ ...data, comment: e.target.value })}
        ></textarea>
      </div>
      <PrimaryBtn
        className="absolute right-4 "
        text="Ajouter"
        clickFn={() => {
          if (Verif(data)) {
            addProtocolMutation.mutate()
          }
        }}
      />
    </div>
  )
}

function Verif(data: ProductForm): Boolean {
  if (!data.moleculeId) {
    toast.error("Veuillez selectionner une molécule")
    return false
  }
  if (isEmpty(data.speciality)) {
    toast.error("Veuillez saisir une spécialité")
    return false
  }

  if (!data.minConcentration) {
    toast.error("Veuillez saisir une concetracion min")
    return false
  }

  if (!isPositif(data.minConcentration)) {
    toast.error("La concetracion min doit être positive")
    return false
  }
  if (!isFloat(data.minConcentration)) {
    toast.error("La concetracion min doit être un décimal")
    return false
  }
  if (!data.maxConcentration) {
    toast.error("Veuillez saisir une concetracion max")
    return false
  }

  if (!isPositif(data.maxConcentration)) {
    toast.error("La concetracion max doit être positive")
    return false
  }
  if (!isFloat(data.maxConcentration)) {
    toast.error("La concetracion max doit être un décimal")
    return false
  }
  if (data.minConcentration >= data.maxConcentration) {
    toast.error(
      "La concentration min doit être inférieure à la concentration max",
    )
    return false
  }

  if (!data.dilutionVolume) {
    toast.error("Veuillez saisir un volume dilution")
    return false
  }

  if (!isPositif(data.dilutionVolume)) {
    toast.error("Le volume dilution doit être positif")
    return false
  }
  if (!isFloat(data.dilutionVolume)) {
    toast.error("Le volume dilution doit être un décimal")
    return false
  }
  if (
    data.conservrationDilutionFridge &&
    !data.concervationtionPeriodDilution
  ) {
    toast.error("Veuillez saisir le délai de conservation")
    return false
  }
  if (data.isReconstruct) {
    if (!data.solventReconstitution) {
      toast.error("Veuillez selectionner un solvant de reconstitution")
      return false
    }

    if (!data.volumeReconstitution) {
      toast.error("Veuillez saisir un volume de reconstitution")
      return false
    }
  }
  if (!isFloat(data.volumeReconstitution)) {
    toast.error("Le volume de reconstitution est un décimal")
    return false
  }

  return true
}

export type OptionProps<T> = {
  text: string
  selected: Option<T> | undefined
  setSelected: (s: Option<T>) => void
  options: Option<T>[]
  className?: string
}
function AdminLabelOption<T>({
  text,
  selected,
  options,
  setSelected,
  className,
}: OptionProps<T>) {
  return (
    <div>
      <label className={twMerge("block mb-2 text-xl", className)}>{text}</label>
      <AdminOptionInput
        options={options}
        selected={selected}
        setSelected={setSelected}
        className={className}
      />
    </div>
  )
}

type SwitchProps = {
  label: string
  enabled: boolean
  setEnabled: (b: boolean) => void
}

function LabledSwitch({ label, enabled, setEnabled }: SwitchProps) {
  return (
    <div>
      <label className={"block mb-2 text-xl"}>{label}</label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          !enabled ? "bg-gray-button bg-opacity-60" : "bg-secondary-blue"
        }
          relative inline-flex items-center h-7 w-20 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-[52px]" : "translate-x-0"}
            pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-100 ease-in-out bg-primary-gray`}
        />
      </Switch>
    </div>
  )
}

type BigSwitchProps = {
  enabled: boolean
  setEnabled: (b: boolean) => void
  option1: string
  option2: string
}

function BigSwitch({ option1, option2, enabled, setEnabled }: BigSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`
          bg-primary-gray
          relative inline-flex items-center h-14 w-72 shrink-0 cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 font-medium`}
    >
      <span
        className={`transition duration-100 ease-out absolute left-4 z-10 ${
          !enabled ? "text-white-shade" : ""
        }`}
      >
        {option1}
      </span>
      <span
        className={`absolute right-4 z-10 ${enabled ? "text-white-shade" : ""}`}
      >
        {option2}
      </span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-[144px]" : "translate-x-0"}
            pointer-events-none inline-block h-14 w-36 transform bg-white shadow-lg rounded-2xl transition duration-100 ease-in-out bg-secondary-blue`}
      />
    </Switch>
  )
}
type Flacons = {
  dosage: number
  volume: number
}
function FlaconTable() {
  const columnHelperFlacon = createColumnHelper()
  const [flacons, setFlacons] = useState<Flacons[]>([
    {
      dosage: 0,
      volume: 0,
    },
  ])
  const columns = [
    columnHelperFlacon.accessor((row) => row.dosage, {
      id: "dosage",
      header: "Dosage",
      cell: (info) => {
        const initialvalue = info.getValue()
        const [value, setValue] = useState(String(initialvalue))
        return (
          <div className="">
            <TextInput
              className="focus:outline-secondary-blue shadow-none border-primary-blue border-opacity-20 w-24"
              value={String(value)}
              setValue={setValue}
              isNumber={true}
            />
          </div>
        )
      },
    }),
  ]
}
