import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import addIcon from "@assets/icons/add.svg"
import deleteIcon from "@assets/icons/delete.svg"
import settingsIcon from "@assets/icons/settings.svg"
import { twMerge } from "tailwind-merge"
import TextInput from "@components/atoms/TextInput"
import { useEffect, useState } from "react"
import OptionInput from "@components/atoms/OptionInput"
import { useQuery } from "@tanstack/react-query"
import { getAllMolecules } from "@helpers/apis/molecule"

type Props = {
  data: TMolecule[]
  setData: (data: TMolecule[]) => void
}
export type TMolecule = {
  name: string
  dose: number
  unite: string
}

export default function MoleculeTable({ data, setData }: Props) {
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
    columnHelperProtocol.accessor((row) => row.name, {
      id: "name",
      header: "Nom Molécule",
      cell: (info) => {
        const options = query.data
          ? query.data.map((molecule) => ({
              label: molecule.name,
              value: molecule.name,
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
                  name: selected.value,
                }
                setData(newMolecule)
              }}
            />
          </div>
        )
      },
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
              className="focus:outline-secondary-blue shadow-none  border-primary-blue border-opacity-20"
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
              className="w-60"
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
    columnHelperProtocol.display({
      id: "Actions",
      header: "Actions",
      cell: (row) => (
        <div className=" flex justify-center item gap-4">
          <Icon src={settingsIcon} />
          <Icon src={deleteIcon}></Icon>
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
    setData([...data, { name: "heloo", dose: 0, unite: "mg" }])
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
            <td colSpan={4} className="p-2 bg-gray-table ">
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
type ActionProps = {
  deleteFn: Function
}
function Actions({ deleteFn }: ActionProps) {
  return (
    <div className="flex justify-center gap-4">
      <Icon src={addIcon} onCLick={() => deleteFn} />
    </div>
  )
}
