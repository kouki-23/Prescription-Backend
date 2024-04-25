import PrimaryBtn from "@components/atoms/PrimaryBtn"
import Title from "@components/atoms/Title"
import MoleculeTable, { TMolecule } from "@components/organisms/MoleculeTable"
import { addProtocol } from "@helpers/apis/protocol"
import { isEmpty, isInteger, isPositif } from "@helpers/validation"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"
import backIcon from "@assets/icons/back.svg"

type PropsInput = {
  text: string
  isNumber: boolean
  value: string
  className?: string
  setValue: Function
}
function ProtocolInput({
  text,
  isNumber,
  value,
  className,
  setValue,
}: PropsInput) {
  return (
    <div className={twMerge("mt-2", className)}>
      <p className="font-montserrat  pb-1">{text}</p>
      <input
        className="bg-white-shade bg-opacity-50 rounded-lg py-2 px-4 border border-primary-blue border-opacity-20 w-56  h-7  focus:outline-secondary-blue"
        type={isNumber ? "number" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

type Props = {}
export type TProtocol = {
  name: string
  intercure: number
  nbCures: number
  details: string
  indications: string
  histoType: string
  molecules: TMolecule[]
}
type ProtocolProps = {
  data: TProtocol
  setData: React.Dispatch<React.SetStateAction<TProtocol>>
}
export default function AddProtocolPage({}: Props) {
  const navigator = useNavigate()
  const [data, setData] = useState<TProtocol>({
    name: "",
    intercure: 0,
    nbCures: 0,
    details: "",
    indications: "",
    histoType: "",
    molecules: [],
  })
  const addProtocolMut = useMutation({
    mutationKey: ["protocol"],
    mutationFn: () => addProtocol(data),
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Protocole ajouté avec succès")
      navigator("/admin/")
    },
  })
  return (
    <div className="px-5">
      <img
        className="cursor-pointer py-5"
        src={backIcon}
        onClick={() => navigator(-1)}
      />
      <AddProtocol data={data} setData={setData} />
      <Title text="Ajouter Molécule" className="bg-opacity-40 ml-10 p-6" />
      <div className="container mx-auto">
        <MoleculeTable
          data={data.molecules}
          setData={(molecules) => setData({ ...data, molecules })}
          intercure={data.intercure}
        />
      </div>
      <PrimaryBtn
        className="fixed bottom-4 right-10 "
        text="Ajouter"
        clickFn={() => {
          if (verif(data)) {
            addProtocolMut.mutate()
          }
        }}
      />
    </div>
  )
}

export function AddProtocol({ data, setData }: ProtocolProps) {
  return (
    <div>
      <Title text="Ajouter Protocole " className="bg-opacity-40 ml-10 p-6" />
      <div className="grid grid-cols-3 gap-4 place-items-center">
        <ProtocolInput
          text="Nom Protocol"
          isNumber={false}
          value={data.name}
          setValue={(value: string) => setData({ ...data, name: value })}
        />
        <ProtocolInput
          text="Nombres Cures"
          isNumber={true}
          value={String(data.nbCures)}
          setValue={(value: string) =>
            setData({ ...data, nbCures: Number(value) })
          }
        />
        <ProtocolInput
          text="Intercures"
          isNumber={true}
          value={String(data.intercure)}
          setValue={(value: string) =>
            setData({ ...data, intercure: Number(value) })
          }
        />
        <ProtocolInput
          text="Détails"
          isNumber={false}
          value={data.details}
          setValue={(value: string) => setData({ ...data, details: value })}
        />
        <ProtocolInput
          text="Indications"
          isNumber={false}
          value={data.indications}
          setValue={(value: string) => setData({ ...data, indications: value })}
        />
        <ProtocolInput
          text="Type Histologique"
          isNumber={false}
          value={String(data.histoType)}
          setValue={(value: string) => setData({ ...data, histoType: value })}
        />
      </div>
    </div>
  )
}
function verif(data: TProtocol): boolean {
  if (isEmpty(data.name)) {
    toast.error("Veillez saisir le nom du Protocole")
    return false
  }
  if (!data.nbCures) {
    toast.error("Veillez saisir le nombre de cures")
    return false
  }
  if (!isInteger(data.nbCures) && !isPositif(data.nbCures)) {
    toast.error("Le nombre de cures est un entier positif")
    return false
  }
  if (!data.intercure) {
    toast.error("veillez saisir l'intercure")
    return false
  }
  if (!isInteger(data.intercure) && !isPositif(data.intercure)) {
    toast.error("L'intercure est un entier positif")
    return false
  }
  if (data.molecules.length === 0) {
    toast.error("Vous devez ajouter au moins une molécule.")
    return false
  }

  return true
}
