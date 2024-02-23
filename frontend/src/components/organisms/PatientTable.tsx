import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import deleteIcon from "../../assets/icons/delete.svg"
import listIcon from "../../assets/icons/list.svg"
import addIcon from "../../assets/icons/add.svg"
import editIcon from "../../assets/icons/edit.svg"

type Props = {
  data: TPatientTable[]
}

export type TPatientTable = {
  id: number
  DMI: number
  index: number
  firstName: string
  lastName: string
  birthDate: string
  gender: string
}
export default function PatientTable({ data }: Props) {
  const columnHelper = createColumnHelper<TPatientTable>()
  const columns = [
    columnHelper.accessor((row) => row.DMI, {
      id: "DMI",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.firstName, {
      id: "firstName",
      cell: (info) => info.getValue(),
      header: "prenom",
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => info.getValue(),
      header: "Nom",
    }),
    columnHelper.accessor((row) => row.birthDate, {
      id: "birthDate",
      header: "Date de Naissance",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.gender, {
      id: "gender",
      cell: (info) => info.getValue(),
      header: "Genre",
    }),
    columnHelper.display({
      id: "prescriptionActions",
      cell: () => <PrescriptionActions />,
      header: "Prescription",
    }),
    columnHelper.display({
      id: "Actions",
      cell: () => <Actions />,
      header: "Actions",
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-3/5 text-sm table-fixed border-collapse rounded-xl border-hidden shadow">
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
  )
}

type ActionsProps = {}

function Actions({}: ActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Icon src={editIcon} />
      <Icon src={deleteIcon} />
    </div>
  )
}

type PrescriptionActionsProps = {}

function PrescriptionActions({}: PrescriptionActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Icon src={addIcon} />
      <Icon src={listIcon} />
    </div>
  )
}

function Icon({ src }: { src: string }) {
  return <img className="w-7 h-7" src={src} />
}
