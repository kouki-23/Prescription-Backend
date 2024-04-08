import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect } from "react"
import { twMerge } from "tailwind-merge"
import editIcon from "@assets/icons/edit.svg"
import deleteIcon from "@assets/icons/delete.svg"
import listIcon from "@assets/icons/list.svg"

type Props = {
  data: TProductData[]
  setData: (data: TProductData[]) => void
}
export type TProductData = {
  dci: string
  specialite: string
  dose: number
  volume: number
  isReconstruct: boolean
}

export function SpecialtityTable({ data, setData }: Props) {
  const columnHelper = createColumnHelper<TProductData>()
  const columns = [
    columnHelper.accessor((row) => row.specialite, {
      id: "specialite",
      cell: (info) => info.getValue(),
      header: "Specialité",
    }),
    columnHelper.accessor((row) => row.dci, {
      id: "dci",
      cell: (info) => info.getValue(),
      header: "Molecule",
    }),
    columnHelper.accessor((row) => row.dose, {
      id: "dose",
      cell: (info) => info.getValue(),
      header: "Dose",
    }),
    columnHelper.accessor((row) => row.volume, {
      id: "volume",
      cell: (info) => info.getValue(),
      header: "Volume",
    }),
    columnHelper.accessor((row) => row.isReconstruct, {
      id: "isReconstruct",
      cell: (info) => info.getValue(),
      header: "Statut",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex justify-center gap-4">
          <Icon src={listIcon} />
          <Icon src={editIcon} />
          <Icon
            src={deleteIcon}
            onCLick={() => setData(data.filter((_, i) => i !== info.row.index))}
          />
        </div>
      ),
    }),
  ]
  useEffect(() => {
    console.log(columns)
  })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <table className="w-full text-sm  border-collapse rounded-xl border-hidden shadow ">
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
    </table>
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
