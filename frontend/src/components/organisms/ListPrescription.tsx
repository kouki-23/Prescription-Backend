import Title from "@components/atoms/Title"
import {
  Cure,
  Prescription,
  PrepMolecule,
  UserRole,
  CureState,
} from "@helpers/types"
import prescriptionIcon from "@assets/icons/prescription.svg"
import cureIcon from "@assets/icons/cure.svg"
import jourIcon from "@assets/icons/jour.svg"
import plusIcon from "@assets/icons/plus.svg"
import minusIcon from "@assets/icons/minus.svg"
import moleculeIcon from "@assets/icons/molecule.svg"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDaysToDate } from "@helpers/utils"
import deleteIcon from "@assets/icons/delete.svg"
import { deletePrescription } from "@helpers/apis/prescription"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ConfirmModel from "@components/molecules/ConfirmModel"
import { deleteCure } from "@helpers/apis/cure"
import { useAuth } from "@helpers/auth/auth"

type Props = {
  prescriptions: Prescription[]
  refetch: Function
}

export default function ListPrescription({ prescriptions, refetch }: Props) {
  return (
    <div className="mr-8">
      <Title text="PLANIFICATION DES PRESCRIPTIONS" className="text-4xl ml-5" />
      {prescriptions.map((prescription, i) => (
        <PrescriptionCard
          key={prescription.id}
          prescription={prescription}
          index={i}
          refetch={refetch}
        />
      ))}
    </div>
  )
}

type CardProps = {
  icon: string
  title: string
  subTitle?: string
  state?: string
  isExpended?: boolean
  setIsExpended?: (b: boolean) => void
  onClick?: () => void
  hover?: boolean
  OnHoverClick?: () => void
  color?: "blue" | "green" | "orange"
}

function Card({
  icon,
  title,
  subTitle,
  state,
  isExpended,
  setIsExpended,
  onClick,
  hover,
  OnHoverClick,
  color,
}: CardProps) {
  const [bgColor, textColor] = useMemo(() => {
    if (!color || color === "blue") {
      return ["bg-light-blue  bg-opacity-15", "text-secondary-blue"]
    }
    if (color === "green") {
      return ["bg-green-shade bg-opacity-15", "text-[#50845e]"]
    }
    if (color === "orange") {
      return ["bg-orange-shade bg-opacity-15", "text-orange-shade"]
    }
    return ["", ""]
  }, [color])
  return (
    <div className="relative flex w-full m-2 gap-3 items-center showImage">
      {isExpended !== undefined && setIsExpended !== undefined && (
        <img
          className="cursor-pointer size-5"
          onClick={() => setIsExpended(!isExpended)}
          src={isExpended ? minusIcon : plusIcon}
        />
      )}
      <div
        className={`flex w-full items-center ${bgColor} rounded-lg p-2 px-5 shadow-sm justify-between ${
          onClick ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <img className="size-6" src={icon} />
          <span className="text-primary-blue font-semibold text-xl">
            {title}
          </span>
          <span className="text-sm ">{subTitle}</span>
        </div>
        <div className="flex items-center">
          <span
            className={`px-2 font-semibold text-xl transition-all ${textColor}`}
          >
            {state}
          </span>
        </div>
      </div>
      {hover && (
        <img
          className="cursor-pointer right-0 hidden size-7"
          src={deleteIcon}
          onClick={OnHoverClick ? OnHoverClick : () => {}}
        />
      )}
    </div>
  )
}

function PrescriptionCard({
  prescription,
  index,
  refetch,
}: {
  prescription: Prescription
  index: number
  refetch: Function
}) {
  const { user } = useAuth()
  const navigator = useNavigate()
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)
  const deletePerscriptionMut = useMutation({
    mutationKey: ["prescription", "delete", prescription.id],
    mutationFn: () => deletePrescription(prescription.id),
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      refetch()
    },
  })
  const [isExpended, setIsExpended] = useState(false)
  const isCompteted = useMemo(
    () => prescription.cures.every((c) => c.state === "Terminée"),
    [prescription],
  )
  return (
    <>
      <ConfirmModel
        confirmFn={() => deletePerscriptionMut.mutate()}
        isOpen={deleteModelOpen}
        setIsOpen={setDeleteModelOpen}
        text="Voulez-vous vraiment supprimer cette prescription"
      />
      <Card
        key={prescription.id}
        icon={prescriptionIcon}
        title={`Prescription ${index + 1}:`}
        subTitle={prescription.protocolName}
        onClick={() => navigator(`${prescription.id}`)}
        hover={user?.role === UserRole.MEDECIN ? true : false}
        OnHoverClick={() => setDeleteModelOpen(true)}
        state={isCompteted ? "Terminée" : "En Cours"}
        isExpended={isExpended}
        setIsExpended={setIsExpended}
        color={isCompteted ? "green" : "blue"}
      />
      {isExpended && (
        <div className="ml-10">
          {prescription.cures.map((c, i) => (
            <CureCard key={c.id} cure={c} refetch={refetch} index={i} />
          ))}
        </div>
      )}
    </>
  )
}

function CureCard({
  cure,
  index,
  refetch,
}: {
  cure: Cure
  index: number
  refetch: Function
}) {
  const { user } = useAuth()
  const [isExpended, setIsExpended] = useState(false)
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)
  const deleteCureMut = useMutation({
    mutationKey: ["cure", "delete", cure.id],
    mutationFn: () => deleteCure(cure.id),
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      refetch()
    },
  })
  const groupedMolecules = useMemo(() => {
    let groups = new Map<number, PrepMolecule[]>()
    cure.prepMolecule.forEach((prepMolecule) => {
      let g = groups.get(prepMolecule.day)
      if (g) {
        groups.set(prepMolecule.day, [...g, prepMolecule])
      } else {
        groups.set(prepMolecule.day, [prepMolecule])
      }
    })
    return groups
  }, [cure])
  let color: "orange" | "green" | "blue" | undefined = undefined
  if (cure.state === CureState.PREVU) {
    color = "orange"
  } else if (cure.state === CureState.TERMINEE) {
    color = "green"
  } else {
    color = "blue"
  }
  return (
    <>
      <ConfirmModel
        confirmFn={() => deleteCureMut.mutate()}
        isOpen={deleteModelOpen}
        setIsOpen={setDeleteModelOpen}
        text="Voulez-vous vraiment supprimer cette cure? (Remarque : toutes les prochaines cures seront également supprimées)"
      />
      <Card
        key={cure.id}
        icon={cureIcon}
        title={`Cure ${index + 1}:`}
        subTitle={String(cure.startDate)}
        state={cure.state}
        isExpended={isExpended}
        setIsExpended={setIsExpended}
        hover={user?.role === UserRole.MEDECIN ? true : false}
        OnHoverClick={() => setDeleteModelOpen(true)}
        color={color}
      />
      {isExpended && (
        <div className="ml-10">
          {[...groupedMolecules.keys()]
            .sort((a, b) => a - b)
            .map((p) => {
              const prepM = groupedMolecules.get(p)
              if (prepM)
                return <JourneyCard key={p} prepMolecules={prepM} cure={cure} />
            })}
        </div>
      )}
    </>
  )
}

function JourneyCard({
  prepMolecules,
  cure,
}: {
  prepMolecules: PrepMolecule[]
  cure: Cure
}) {
  const [isExpended, setIsExpended] = useState(false)
  const date = useMemo(
    () => addDaysToDate(cure.startDate, prepMolecules[0].day - 1),
    [cure.startDate],
  )

  let color: "orange" | "green" | "blue" | undefined = undefined
  let state = undefined
  if (cure.state === CureState.PREVU) {
    color = "orange"
    state = CureState.PREVU
  } else if (cure.state === CureState.TERMINEE) {
    color = "green"
    state = CureState.TERMINEE
  } else {
    const isCompleted = prepMolecules.every((p) => p.finished === true)
    if (isCompleted) {
      color = "green"
      state = CureState.TERMINEE
    } else {
      color = "blue"
      state = CureState.EN_COURS
    }
  }

  return (
    <>
      <Card
        key={prepMolecules[0].day}
        icon={jourIcon}
        title={`J${prepMolecules[0].day}:`}
        subTitle={date.toISOString().split("T")[0]}
        state={state}
        isExpended={isExpended}
        setIsExpended={setIsExpended}
        color={color}
      />
      {isExpended && (
        <div className="ml-16">
          {prepMolecules.map((m) => (
            <Card
              icon={moleculeIcon}
              title={m.productsUsed[0].product.molecule.name}
              subTitle={m.dose + " " + m.unite}
              color={color === "orange" ? color : m.finished ? "green" : "blue"}
            />
          ))}
        </div>
      )}
    </>
  )
}
