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
type pageProps = {
  data: Product
  setData: React.Dispatch<React.SetStateAction<Product>>
}
export default function AddSpeciality({ data, setData }: pageProps) {
  const navigator = useNavigate()

  const {
    isLoading,
    error,
    data: molecules,
  } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  const [options, setOptions] = useState<Option<string>[]>([])

  return (
    <div>
      <Title text="Ajouter spécialité" className="p-6" />
      <div className="container ml-6 flex space-x-80">
        <div className="space-y-8">
          <AdminLabledInput
            text="Nom molecule"
            value=""
            setValue={() => console.log("hello")}
            isNumber={true}
          />
          <AdminLabelOption
            text="Nom molecule"
            selected={
              data.molecule.name
                ? { label: data.molecule.name, value: data.molecule.name }
                : null
            }
            setSelected={(selected) => {
              setData({
                ...data,
                molecule: { ...data.molecule, name: selected.value },
              })
            }}
            options={[]}
          />

          <AdminLabledInput
            text="Véhicule"
            value={String(data.minConcentrarion)}
            setValue={(value: string) =>
              setData({ ...data, minConcentrarion: Number(value) })
            }
            isNumber={true}
          />
          <AdminLabledInput
            text="Concentration Min"
            value={String(data.minConcentrarion)}
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
export type OptionProps = {
  text: string
  selected: Option<string> | null
  setSelected: (s: Option<string>) => void
  options: Option<string>[]
  className?: string
}
function AdminLabelOption({
  text,
  selected,
  options,
  setSelected,
  className,
}: OptionProps) {
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
