import PrimaryBtn from "@components/atoms/PrimaryBtn"
import Title from "@components/atoms/Title"
import MoleculeTable, { TMolecule } from "@components/organisms/MoleculeTable"
import { Molecule } from "@helpers/types"
import {
  isEmpty,
  isInteger,
  isOnlyLetter,
  isPositif,
} from "@helpers/validation"
import { useState } from "react"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

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
  const [data, setData] = useState<TProtocol>({
    name: "",
    intercure: 0,
    nbCures: 0,
    details: "",
    indications: "",
    histoType: "",
    molecules: [],
  })
  return (
    <div>
      <AddProtocol data={data} setData={setData} />
      <Title text="Ajouter Molécule" className="bg-opacity-40 ml-10 p-6" />
      <div className="container mx-auto">
        <MoleculeTable
          data={data.molecules}
          setData={(molecules) => setData({ ...data, molecules })}
        />
      </div>
      <PrimaryBtn
        className="fixed bottom-4 right-10 "
        text="Ajouter"
        clickFn={() => {
          if (verif(data)) {
            toast.success("Protocole ajouter avec succés")
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
          text="Histotype"
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
    toast.error("veillez saisir le nom du Protocol")
    return false
  }
  if (!isOnlyLetter(data.name)) {
    toast.error("Le nom est composé seulement par des lettres")
    return false
  }
  if (!data.nbCures) {
    toast.error("veillez saisir le nombre des cures")
    return false
  }
  if (!isInteger(data.nbCures) && !isPositif(data.nbCures)) {
    toast.error("Le nombre de cure est un entier positif")
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

  return true
}
