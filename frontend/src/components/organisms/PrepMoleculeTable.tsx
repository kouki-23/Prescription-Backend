import PrimaryBtn from "@components/atoms/PrimaryBtn"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import { Cure, PatientData } from "@helpers/types"
import { addDaysToDate } from "@helpers/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import addIcon from "@assets/icons/add.svg"
import plusIcon from "@assets/icons/plus-green.svg"
import minusIcon from "@assets/icons/minus-red.svg"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updatePrepMolecules } from "@helpers/apis/prepMolcule"
import Model from "@components/atoms/Model"
import { login } from "@helpers/apis/user"
import { useAuth } from "@helpers/auth/auth"

type Props = {
  cure: Cure
  setCure: (c: Cure) => void
  patient: PatientData
  selectedCure: number
}

type TCureData = {
  day: number
  name: string
  dose: number
  doseAdaptee: number
  unite: string
  duration: number
  time: string
}

export default function PrepMoleculeTable({
  cure,
  setCure,
  patient,
  selectedCure,
}: Props) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
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
    columnHelper.accessor((row) => row.dose + " " + row.unite, {
      id: "doseUniteT",
      cell: (info) => info.getValue(),
      header: "Dose théorique - Unite",
      maxSize: 10,
    }),
    columnHelper.accessor((row) => row.dose * patient.bodySurface, {
      id: "doseT",
      cell: (info) => info.getValue(),
      header: "Dose théorique",
    }),
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
      header: "Dose Adaptee - Unite",
      size: 50,
    }),
    columnHelper.accessor(
      (row) => Math.round(row.doseAdaptee * patient.bodySurface * 100) / 100,
      {
        id: "doseAdaptee",
        cell: (info) => info.getValue(),
        header: "Dose Adaptee",
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
      cell: (info) => info.getValue() + "h",
      header: "Duree",
    }),
    columnHelper.display({
      id: "Action",
      cell: () => <Action />,
      header: "Action",
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
            {/*<img className="size-8" src={listIcon} />*/}
            <img className="size-8" src={addIcon} />
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
      <pre>{JSON.stringify(cure, null, 2)}</pre>
    </>
  )
}

function Action() {
  return (
    <div className="flex justify-center">
      <div className="size-7 bg-primary-red bg-opacity-50 border-primary-red border-2 rounded-full"></div>
    </div>
  )
}

function transformCureToDataTable(cure: Cure): TCureData[] {
  return cure.prepMolecule
    .map((p) => {
      return {
        day: p.day,
        name: p.details.molecule.name,
        dose: p.details.molecule.protocoleMoleculeAssociation[0].dose,
        doseAdaptee: p.dose,
        unite: p.unite,
        duration: p.duration,
        time: p.time,
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
      {`J${day} ( ${
        addDaysToDate(startDate, day - 1)
          .toISOString()
          .split("T")[0]
      } )`}
      <img
        className="size-5 cursor-pointer"
        src={plusIcon}
        onClick={() => setDay(day + 1)}
      />
    </div>
  )
}
