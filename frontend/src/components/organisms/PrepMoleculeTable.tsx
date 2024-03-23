import PrimaryBtn from "@components/atoms/PrimaryBtn"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import { Cure, Option, PatientData } from "@helpers/types"
import { addDaysToDate } from "@helpers/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import addIcon from "@assets/icons/add.svg"
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

type Props = {
  cure: Cure
  setCure: (c: Cure) => void
  patient: PatientData
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
}

export default function PrepMoleculeTable({
  cure,
  setCure,
  patient,
  selectedCure,
  intercure,
}: Props) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isAddProduitOpen, setIsAddProduitOpen] = useState(false)
  const [data, setData] = useState(transformCureToDataTable(cure))
  const [isCureChanged, setIsCureChanged] = useState(false)
  const [password, setPassword] = useState("")
  const cureMut = useMutation({
    mutationKey: ["prepMolecules", cure.order],
    mutationFn: async () => {
      if (user) {
        await login(user.username, password)
        updatePrepMolecules(cure.prepMolecule)
      }
    },
    onError: () => {
      toast.error("Erreur survenue")
    },
    onSuccess: () => {
      toast.success("Mis à jour avec succès")
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
  }, [selectedCure])
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
      cell: (info) => info.getValue(),
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
      (row) => Math.round(row.dose * patient.bodySurface * 100) / 100,
      {
        id: "doseT",
        cell: (info) => info.getValue() + " mg",
        header: "Dose théorique",
      },
    ),
    columnHelper.accessor((row) => row.doseAdaptee, {
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
      (row) => Math.round(row.doseAdaptee * patient.bodySurface * 100) / 100,
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
        return (
          <div className="flex justify-center">
            <input
              className="bg-primary-gray rounded-lg py-2 px-4 focus:outline-secondary-blue shadow-md"
              type="time"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setChanges(value)}
            />
          </div>
        )
      },
      header: "Heure",
    }),
    columnHelper.accessor((row) => row.duration, {
      id: "duree",
      cell: "XX minute",
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
      <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Title className="text-3xl" text="Entrez votre mot de passe" />
        <p className="font-medium py-6">
          Pour confirmer l'enregistrement , veuillez entrer votre mot de passe :
        </p>
        <div className="flex items-center gap-3">
          <span className="font-medium">Mot de passe</span>
          <TextInput
            value={password}
            setValue={(s) => setPassword(s)}
            isPassword={true}
          />
        </div>
        <PrimaryBtn
          className="px-4 py-2 mt-8"
          text="Enregistrer"
          clickFn={() => cureMut.mutate()}
        />
      </Model>
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
              Cure {cure.order}
            </span>
          </div>
          <div className="flex gap-2">
            <PrimaryBtn
              className="p-1 px-2 text-sm"
              text="Enregistrer"
              clickFn={() => setIsOpen(true)}
            />
            <img
              className="size-8 cursor-pointer"
              src={addIcon}
              onClick={() => setIsAddProduitOpen(true)}
            />
            <img
              className="size-8 cursor-pointer"
              src={fileIcon}
              onClick={() => {
                const url = window.location
                window.open(`${url}/file/${cure.order}`)
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

  return (
    <div className="flex justify-center">
      <div
        onClick={() => setValidation(validation === 0 ? 1 : 0)}
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
        name: p.details.molecule.name,
        dose: p.theoreticalDose,
        doseAdaptee: p.dose,
        unite: p.unite,
        duration: p.duration,
        time: p.time,
        validation: p.validation,
        perfusionType: p.perfusionType,
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

  const { isLoading, error, data } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })

  const mutation = useMutation({
    mutationKey: ["prepMolecule"],
    mutationFn: () => addPrepMoleculeToCure(cureId, prepMolecule),
    onError: (e) => toast.error(e.message),
    onSuccess: (data) => {
      toast.success("produit ajouter avec succès")
      setCure(data.data)
      setIsOpen(false)
      setDataTable(transformCureToDataTable(data.data))
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
      <PrimaryBtn text="Ajouter" clickFn={() => mutation.mutate()} />
    </Model>
  )
}
