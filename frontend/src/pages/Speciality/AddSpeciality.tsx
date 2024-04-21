import { AdminLabledInput } from "@components/molecules/AdminLabledInput"
import OptionInput from "@components/atoms/OptionInput"
import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { Switch } from "@headlessui/react"
import { getAllMolecules } from "@helpers/apis/molecule"
import { Option } from "@helpers/types"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

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
            text="Concentration Min"
            value={String(data.minConcentration)}
            setValue={(value: string) =>
              setData({ ...data, minConcentration: Number(value) })
            }
            isNumber={true}
          />
          <AdminLabledInput
            text="Volume Dilution"
            value={String(data.dilutionVolume)}
            setValue={(value: string) =>
              setData({ ...data, dilutionVolume: Number(value) })
            }
            isNumber={true}
          />
          <LabledSwitch
            label="PVC"
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
            text="Specialité"
            value={data.speciality}
            setValue={(value: string) =>
              setData({ ...data, speciality: value })
            }
            isNumber={false}
          />
          <AdminLabledInput
            text="Concentration Max"
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
              text="Volume de reconstiturion"
              value={String(data.maxConcentration)}
              setValue={(value: string) =>
                setData({ ...data, maxConcentration: Number(value) })
              }
              isNumber={true}
            />
          </div>
        )}
      </div>
    </div>
  )
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
      <OptionInput
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
