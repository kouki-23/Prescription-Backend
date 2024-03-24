import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import addIcon from "@assets/icons/add.svg"
import deleteIcon from "@assets/icons/delete.svg"
import { twMerge } from "tailwind-merge"
import TextInput from "@components/atoms/TextInput"
import { useState } from "react"
import OptionInput from "@components/atoms/OptionInput"
import { useQuery } from "@tanstack/react-query"
import { getAllMolecules } from "@helpers/apis/molecule"
import DayListCheckBox from "@components/atoms/DayListCheckBox"

const voieOptions = [
  { label: "Bolus", value: "Bolus" },
  { label: "Perf continue", value: "Perf continue" },
  { label: "Infuseur 24h", value: " Infuseur 24h" },
  { label: "Infuseur 48h", value: "Infuseur 48h" },
  { label: "Infuseur 5j", value: "Infuseur 5j" },
]

type Props = {
  data: TMolecule[]
  setData: (data: TMolecule[]) => void
  intercure: number
}
export type TMolecule = {
  moleculeId: number
  dose: number
  unite: string
  days: number[]
  perfusionType: string
}

export default function MoleculeTable({ data, setData, intercure }: Props) {
  const columnHelperProtocol = createColumnHelper<TMolecule>()
  const query = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })
  const options = [
    { label: "mg/kg", value: "mg/kg" },
    { label: "mg", value: "mg" },
    { label: "mg/m²", value: "mg/m²" },
    { label: "AUC", value: "AUC" },
  ]
  const columns = [
    columnHelperProtocol.accessor((row) => row.moleculeId, {
      id: "name",
      header: "Nom Molécule",
      cell: (info) => {
        const options = query.data
          ? query.data.map((molecule) => ({
              label: molecule.name,
              value: molecule.id,
            }))
          : []

        return (
          <div className="flex justify-center items-center ">
            <OptionInput
              className="w-60"
              options={options}
              selected={options.find(
                (option) => option.value === info.getValue(),
              )}
              setSelected={(selected) => {
                let newMolecule = [...data]
                newMolecule[info.row.index] = {
                  ...newMolecule[info.row.index],
                  moleculeId: selected.value,
                }
                setData(newMolecule)
              }}
            />
          </div>
        )
      },
    }),
    columnHelperProtocol.accessor((row) => row.perfusionType, {
      id: "perfusionType",
      header: "Administration",
      cell: (info) => (
        <select
          className="text-center col-span-2 w-52 py-3 px-2 rounded-lg bg-primary-gray"
          onChange={(e) => {
            let newMolecule = [...data]
            newMolecule[info.row.index] = {
              ...newMolecule[info.row.index],
              perfusionType: e.target.value,
            }
            setData(newMolecule)
          }}
          value={info.getValue()}
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
      ),
    }),
    columnHelperProtocol.accessor((row) => row.dose, {
      id: "dose",
      header: "Dose",
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
    columnHelperProtocol.accessor((row: TMolecule) => row.unite, {
      id: "unite",
      header: "Unité",
      cell: (info) => {
        return (
          <div className="flex justify-center items-center ">
            <OptionInput
              className="w-32"
              options={options}
              selected={options.find(
                (option) => option.value === info.getValue(),
              )}
              setSelected={(selected) => {
                let newMolecule = [...data]
                newMolecule[info.row.index] = {
                  ...newMolecule[info.row.index],
                  unite: selected.value,
                }
                setData(newMolecule)
              }}
            />
          </div>
        )
      },
    }),
    columnHelperProtocol.accessor((row) => row.days, {
      id: "days",
      header: "Jours",
      cell: (info) => (
        <div className="flex justify-center">
          <div className="max-w-96">
            <DayListCheckBox
              nbDays={intercure}
              selectedDays={info.getValue()}
              setSelectedDays={(days) => {
                let newMolecule = [...data]
                newMolecule[info.row.index] = {
                  ...newMolecule[info.row.index],
                  days: days,
                }
                setData(newMolecule)
              }}
            />
          </div>
        </div>
      ),
    }),
    columnHelperProtocol.display({
      id: "Actions",
      header: "Actions",
      cell: (info) => (
        <div className=" flex justify-center item gap-4">
          {/*<Icon src={settingsIcon} />*/}
          <Icon
            src={deleteIcon}
            onCLick={() => setData(data.filter((_, i) => i !== info.row.index))}
          />
        </div>
      ),
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  function OnIconClicked() {
    setData([
      ...data,
      { moleculeId: 0, dose: 0, unite: "", days: [], perfusionType: "" },
    ])
  }

  return (
    <div className="mx-10">
      <table className="container text-sm  border-collapse rounded-xl border-hidden shadow ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="text-white-shade" key={headerGroup.id}>
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
          <tr className="text-center ">
            <td colSpan={10} className="p-2 bg-gray-table ">
              <div className={`flex justify-center items-center`}>
                <Icon src={addIcon} onCLick={() => OnIconClicked()} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Icon({
  src,
  onCLick,
  className,
}: {
  src: string
  onCLick?: () => void
  className?: string
}) {
  return (
    <img
      className={twMerge("w-7 h-7 cursor-pointer", className)}
      src={src}
      onClick={() => (onCLick ? onCLick() : null)}
    />
  )
}
/*type ActionProps = {
  deleteFn: Function
}
function Actions({ deleteFn }: ActionProps) {
  return (
    <div className="flex justify-center gap-4">
      <Icon src={addIcon} onCLick={() => deleteFn} />
    </div>
  )
}*/
