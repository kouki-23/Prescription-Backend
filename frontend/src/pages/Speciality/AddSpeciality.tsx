import { AdminLabledInput } from "@components/atoms/AdminLabledInput"
import OptionInput from "@components/atoms/OptionInput"
import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { getAllMolecules } from "@helpers/apis/molecule"
import { Option, Product } from "@helpers/types"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { getAllVehicules } from "@helpers/apis/vehicule"

type ProductForm = {
  moleculeId: number
  minConcentration: number
  maxConcentration: number
}

export default function AddSpeciality() {
  const navigator = useNavigate()

  const [data, setData] = useState<ProductForm>({
    moleculeId: 0,
    minConcentration: 0,
    maxConcentration: 0,
  })

  const {
    isLoading,
    error,
    data: molecules,
  } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })
  const {
    isLoading,
    error,
    data: molecules,
  } = useQuery({
    queryKey: ["vehicules"],
    queryFn: getAllVehicules,
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  const moleculesOptions: Option<number>[] = molecules!.map((m) => ({
    value: m.id,
    label: m.name,
  }))

  return (
    <div>
      <Title text="Ajouter spécialité" className="p-6" />
      <div className="container ml-6 flex space-x-80">
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
              setData({ ...data, minConcentrarion: Number(value) })
            }
            isNumber={true}
          />
        </div>
        <div className="space-y-8">
          <AdminLabledInput
            text="Specialité"
            value={data.specialite}
            setValue={(value: string) =>
              setData({ ...data, specialite: value })
            }
            isNumber={false}
          />
          <AdminLabledInput
            text="Volume Dilution"
            value={String(data.dilutionVolume)}
            setValue={(value: string) =>
              setData({ ...data, dilutionVolume: Number(value) })
            }
            isNumber={true}
          />
          <AdminLabledInput
            text="Concentration Max"
            value={String(data.maxConcentrarion)}
            setValue={(value: string) =>
              setData({ ...data, maxConcentrarion: Number(value) })
            }
            isNumber={true}
          />
        </div>
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
