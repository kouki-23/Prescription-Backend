import PrimaryBtn from "@components/atoms/PrimaryBtn"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import { Cure, Option, Patient, UserRole } from "@helpers/types"
import { addDaysToDate, getDose } from "@helpers/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import addIcon from "@assets/icons/add-molecule.svg"
import plusIcon from "@assets/icons/plus-green.svg"
import minusIcon from "@assets/icons/minus-red.svg"
import fileIcon from "@assets/icons/file-download.svg"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updatePrepMolecules } from "@helpers/apis/prepMolcule"
import Model from "@components/atoms/Model"
import { login } from "@helpers/apis/user"
import { useAuth } from "@helpers/auth/auth"
import { getDate } from "../../helpers/utils"
import { getAllMolecules } from "@helpers/apis/molecule"
import LoadingInterface from "./LoadingInterface"
import ErrorPage from "@pages/Error/ErrorPage"
import DayListCheckBox from "@components/atoms/DayListCheckBox"
import { addPrepMoleculeToCure } from "@helpers/apis/cure"
import PasswordConfirmation from "@components/molecules/PasswordConfirmation"
import { isEmpty, isPositif } from "@helpers/validation"
import { handleError } from "@helpers/apis"

type Props = {
  cure: Cure
  setCure: (c: Cure) => void
  patient: Patient
  selectedCure: number
  intercure: number
}

type TCureData = {
  day: number
  name: string
  dose: number
  doseAdaptee: number
  unite: string
  duration: number
  time: string
  validation: number
  perfusionType: string
  isCustom: boolean
}

export default function PrepMoleculeTable({
  cure,
  setCure,
  patient,
  selectedCure,
  intercure,
}: Props) {
  const { user } = useAuth()
  if (!user) return <></>
  const [isOpen, setIsOpen] = useState(false)
  const [isAddProduitOpen, setIsAddProduitOpen] = useState(false)
  const [data, setData] = useState(transformCureToDataTable(cure))
  const [isCureChanged, setIsCureChanged] = useState(false)
  const cureMut = useMutation({
    mutationKey: ["prepMolecules", cure.id],
    mutationFn: async (password: string) => {
      if (user) {
        await login(user.username, password)
        updatePrepMolecules(cure.prepMolecule)
      }
    },
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      setIsCureChanged(false)
      setIsOpen(false)
    },
  })
  useEffect(() => {
    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = true
    }
    if (isCureChanged)
      window.addEventListener("beforeunload", handleUnload, { capture: true })
    return () =>
      window.removeEventListener("beforeunload", handleUnload, {
        capture: true,
      })
  }, [isCureChanged])
  useEffect(() => {
    let newCure = cure
    newCure.prepMolecule = cure.prepMolecule.map((p, i) => {
      return {
        ...p,
        dose: data[i].doseAdaptee,
        time: data[i].time,
        day: data[i].day,
        validation: data[i].validation,
      }
    })
    setCure(newCure)
    setIsCureChanged(true)
  }, [data])
  useEffect(() => {
    setData(transformCureToDataTable(cure))
  }, [selectedCure, patient])
  const columnHelper = createColumnHelper<TCureData>()
  const columns = [
    columnHelper.accessor((row) => row.day, {
      id: "day",
      cell: (info) => (
        <DayCell
          day={info.getValue()}
          startDate={new Date(cure.startDate)}
          setDay={(day: number) => {
            let newData = [...data]
            newData[info.row.index] = {
              ...newData[info.row.index],
              day,
            }
            newData.sort((a, b) => a.day - b.day)
            setData(newData)
          }}
        />
      ),
      header: "Jour",
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) =>
        `${info.getValue()} ${info.row.original.isCustom ? "*" : ""}`,
      header: "Produit",
    }),
    columnHelper.accessor((row) => row.perfusionType, {
      id: "perfusionType",
      cell: (info) => info.getValue(),
      header: "Administration",
    }),
    columnHelper.accessor((row) => row.dose + " " + row.unite, {
      id: "doseUniteT",
      cell: (info) => info.getValue(),
      header: "Dose théorique - Unite",
      maxSize: 10,
    }),
    columnHelper.accessor(
      (row) => getDose(row.dose, row.unite, patient, row.name),
      {
        id: "doseT",
        cell: (info) => info.getValue() + " mg",
        header: "Dose théorique",
      },
    ),
    columnHelper.accessor((row) => Math.round(row.doseAdaptee * 100) / 100, {
      id: "doseAdapteeUnite",
      cell: (info) => {
        const initValue = info.getValue()
        const [value, setValue] = useState(String(initValue))
        function setChanges(s: string) {
          let newData = [...data]
          newData[info.row.index] = {
            ...newData[info.row.index],
            doseAdaptee: Number(s),
          }
          setData(newData)
        }

        useEffect(() => setValue(String(initValue)), [initValue])
        return (
          <div className="flex justify-center">
            <div className="relative flex items-center w-28">
              <TextInput
                className="w-full"
                value={String(value)}
                setValue={setValue}
                isNumber={true}
                onBlur={() => setChanges(value)}
                disabled={
                  user.role !== UserRole.MEDECIN ||
                  info.row.original.validation >= 1
                }
              />
              <span className="absolute right-2 text-primary-blue">
                {info.row.original.unite}
              </span>
            </div>
          </div>
        )
      },
      header: "Dose Adaptée - Unité",
      size: 50,
    }),
    columnHelper.accessor(
      (row) => getDose(row.doseAdaptee, row.unite, patient, row.name),
      {
        id: "doseAdaptee",
        cell: (info) => info.getValue() + " mg",
        header: "Dose Adaptée",
      },
    ),
    columnHelper.accessor(
      (row) => Math.round((row.doseAdaptee / row.dose) * 100),
      {
        id: "dosepersentage",
        cell: (info) => {
          const [value, setValue] = useState(String(info.getValue()))
          function setChanges(s: string) {
            let newData = [...data]
            newData[info.row.index] = {
              ...newData[info.row.index],
              doseAdaptee: (Number(s) / 100) * info.row.original.dose,
            }
            setData(newData)
          }
          return (
            <div className="flex justify-center">
              <div className="relative flex items-center w-16">
                <TextInput
                  className="w-full"
                  value={String(value)}
                  setValue={setValue}
                  isNumber={true}
                  onBlur={() => setChanges(value)}
                  disabled={
                    user.role !== UserRole.MEDECIN ||
                    info.row.original.validation >= 1
                  }
                />
                <span className="absolute right-2 text-primary-blue">%</span>
              </div>
            </div>
          )
        },
        header: "Dose%",
      },
    ),
    columnHelper.accessor((row) => row.time, {
      id: "time",
      cell: (info) => {
        const [value, setValue] = useState(String(info.getValue()))
        function setChanges(s: string) {
          let newData = [...data]
          newData[info.row.index] = {
            ...newData[info.row.index],
            time: s,
          }
          setData(newData)
        }
        const disabled =
          user.role !== UserRole.MEDECIN || info.row.original.validation >= 1
        return (
          <div className="flex justify-center">
            <input
              className={`bg-primary-gray rounded-lg py-2 px-4 focus:outline-secondary-blue shadow-md ${
                disabled ? "bg-secondary-gray" : ""
              }`}
              type="time"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setChanges(value)}
              disabled={disabled}
            />
          </div>
        )
      },
      header: "Heure",
    }),
    columnHelper.accessor((row) => row.duration, {
      id: "duree",
      cell: "XX minutes",
      header: "Durée",
    }),
    columnHelper.display({
      id: "Action",
      cell: (info) => (
        <Action
          validation={info.row.original.validation}
          setValidation={(validation) => {
            let newData = [...data]
            newData[info.row.index] = {
              ...newData[info.row.index],
              validation,
            }
            setData(newData)
          }}
        />
      ),
      header: "Validation",
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <PasswordConfirmation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mutation={cureMut}
      />
      <AddProduit
        isOpen={isAddProduitOpen}
        setIsOpen={setIsAddProduitOpen}
        intercure={intercure}
        cureId={cure.id}
        setCure={(cure) => setCure(cure)}
        setDataTable={setData}
      />
      <div>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 my-8">
            <Title className="font-semibold text-3xl" text="Produits" />
            <span className="text-2xl font-semibold text-primary-blue opacity-85">
              Cure {selectedCure + 1}
            </span>
          </div>
          <div className="flex gap-2">
            <PrimaryBtn
              className="p-1 px-2 text-sm"
              text="Enregistrer"
              clickFn={() => setIsOpen(true)}
            />
            {user.role === UserRole.MEDECIN && (
              <img
                className="size-8 cursor-pointer"
                src={addIcon}
                onClick={() => setIsAddProduitOpen(true)}
              />
            )}
            <img
              className="size-8 cursor-pointer"
              src={fileIcon}
              onClick={() => {
                const url = window.location.origin
                window.open(
                  `${url}/${cure.prescriptionId}/${selectedCure}/file`,
                )
              }}
            />
          </div>
        </div>
        <table className="container mx-auto text-sm border-collapse rounded-xl border-hidden shadow">
          <thead className="text-white-shade">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="" key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    className={`py-3 bg-primary-blue ${
                      index === 0 ? "rounded-tl-xl" : ""
                    } ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-xl"
                        : ""
                    }
                `}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="text-center py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Action({
  validation,
  setValidation,
}: {
  validation: number
  setValidation: (a: number) => void
}) {
  const valid = useMemo(() => {
    if (validation === 0) {
      return "bg-primary-red border-primary-red bg-opacity-50"
    } else if (validation === 1) {
      return "bg-green-shade  border-green-shade bg-opacity-30"
    } else if (validation === 2) {
      return "bg-green-shade  border-green-shade"
    }
  }, [validation])

  const { user } = useAuth()

  const setVal = useMemo(() => {
    if (user?.role === UserRole.MEDECIN) {
      if (validation === 2) {
        return () => {}
      }
      return () => setValidation(validation === 0 ? 1 : 0)
    } else if (user?.role === UserRole.PHARMACIEN) {
      if (validation === 0) {
        return () => {}
      }
      return () => setValidation(validation === 1 ? 2 : 1)
    } else {
      return () => {}
    }
  }, [validation])

  return (
    <div className="flex justify-center">
      <div
        onClick={setVal}
        className={`cursor-pointer size-7 ${valid} border-2 rounded-full`}
      ></div>
    </div>
  )
}

function transformCureToDataTable(cure: Cure): TCureData[] {
  return cure.prepMolecule
    .map((p) => {
      return {
        day: p.day,
        name: p.productsUsed[0].product.molecule.name,
        dose: p.theoreticalDose,
        doseAdaptee: p.dose,
        unite: p.unite,
        duration: p.duration,
        time: p.time,
        validation: p.validation,
        perfusionType: p.perfusionType,
        isCustom: p.isCustom,
      } as TCureData
    })
    .sort((a, b) => a.day - b.day)
}

function DayCell({
  day,
  startDate,
  setDay,
}: {
  day: number
  startDate: Date
  setDay: (day: number) => void
}) {
  return (
    <div className="flex items-center gap-1 justify-center">
      <img
        className="size-5 cursor-pointer"
        src={minusIcon}
        onClick={() => setDay(day - 1)}
      />
      {`J${day} ( ${getDate(addDaysToDate(startDate, day - 1))} )`}
      <img
        className="size-5 cursor-pointer"
        src={plusIcon}
        onClick={() => setDay(day + 1)}
      />
    </div>
  )
}

const uniteOptions = [
  { label: "mg/kg", value: "mg/kg" },
  { label: "mg", value: "mg" },
  { label: "mg/m²", value: "mg/m²" },
  { label: "AUC", value: "AUC" },
]

const voieOptions = [
  { label: "Bolus", value: "Bolus" },
  { label: "Perf continue", value: "Perf continue" },
  { label: "Infuseur 24h", value: " Infuseur 24h" },
  { label: "Infuseur 48h", value: "Infuseur 48h" },
  { label: "Infuseur 5j", value: "Infuseur 5j" },
]

type PropsAddProduit = {
  isOpen: boolean
  setIsOpen: (b: boolean) => void
  intercure: number
  cureId: number
  setCure: (cure: Cure) => void
  setDataTable: (cure: TCureData[]) => void
}

function AddProduit({
  isOpen,
  setIsOpen,
  intercure,
  cureId,
  setCure,
  setDataTable,
}: PropsAddProduit) {
  const [prepMolecule, setPrepMolecule] = useState({
    days: [] as number[],
    dose: 0,
    unite: "",
    moleculeId: -1,
    perfusionType: "",
  })
  const verif = useCallback(() => {
    if (prepMolecule.moleculeId === -1) {
      toast.error("Selectionner une molecule")
      return false
    }
    if (!isPositif(prepMolecule.dose)) {
      toast.error("Le dose doit être une entier positif")
      return false
    }
    if (isEmpty(prepMolecule.unite)) {
      toast.error("Selectionner l'unite de dose")
      return false
    }
    if (isEmpty(prepMolecule.perfusionType)) {
      toast.error("Selectionner le type de perfusion")
      return false
    }
    if (prepMolecule.days.length === 0) {
      toast.error("Selectionner une jour")
      return false
    }
    return true
  }, [prepMolecule])
  const { isLoading, error, data } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })

  const mutation = useMutation({
    mutationKey: ["prepMolecule"],
    mutationFn: () => addPrepMoleculeToCure(cureId, prepMolecule),
    onError: (e) => toast.error(handleError(e)),
    onSuccess: (data) => {
      toast.success("produit ajouter avec succès")
      setCure(data.data)
      setIsOpen(false)
      setDataTable(transformCureToDataTable(data.data))
      setPrepMolecule({
        days: [] as number[],
        dose: 0,
        unite: "",
        moleculeId: -1,
        perfusionType: "",
      })
    },
  })
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  let moleculesOption: Option<number>[] = []
  if (data) {
    moleculesOption = data.map((m) => ({
      value: m.id,
      label: m.name,
    }))
  }

  return (
    <Model
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        setPrepMolecule({
          days: [] as number[],
          dose: 0,
          unite: "",
          moleculeId: -1,
          perfusionType: "",
        })
      }}
    >
      <Title className="text-3xl mb-10" text="Ajouter Produit" />
      <div className="grid grid-cols-3 gap-3 items-center">
        <p>Molecule:</p>
        <select
          className="col-span-2 w-52 py-3 px-2 rounded-lg bg-primary-gray"
          onChange={(e) =>
            setPrepMolecule({
              ...prepMolecule,
              moleculeId: Number(e.target.value),
            })
          }
          value={prepMolecule.moleculeId}
        >
          <option value={-1} disabled hidden>
            Sélectionnez
          </option>
          {moleculesOption.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <p>Dose:</p>
        <TextInput
          className="col-span-2 w-52"
          value={String(prepMolecule.dose)}
          setValue={(s) =>
            setPrepMolecule({ ...prepMolecule, dose: Number(s) })
          }
          isNumber={true}
        />
        <p>Unité:</p>
        <select
          className="col-span-2 w-52 py-3 px-2 rounded-lg bg-primary-gray"
          onChange={(e) =>
            setPrepMolecule({
              ...prepMolecule,
              unite: e.target.value,
            })
          }
          value={prepMolecule.unite}
        >
          <option value={""} disabled hidden>
            Sélectionnez
          </option>
          {uniteOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <p>Administration:</p>
        <select
          className="col-span-2 w-52 py-3 px-2 rounded-lg bg-primary-gray"
          onChange={(e) =>
            setPrepMolecule({
              ...prepMolecule,
              perfusionType: e.target.value,
            })
          }
          value={prepMolecule.perfusionType}
        >
          <option value={""} disabled hidden>
            Sélectionnez
          </option>
          {voieOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div className="max-w-96 my-3">
        <DayListCheckBox
          nbDays={intercure}
          selectedDays={prepMolecule.days}
          setSelectedDays={(days) => setPrepMolecule({ ...prepMolecule, days })}
        />
      </div>
      <PrimaryBtn
        text="Ajouter"
        clickFn={() => {
          if (verif()) mutation.mutate()
        }}
      />
    </Model>
  )
}
