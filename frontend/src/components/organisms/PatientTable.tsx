import {
  ColumnFilter,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import deleteIcon from "@assets/icons/delete.svg"
import listIcon from "@assets/icons/list.svg"
import addIcon from "@assets/icons/add.svg"
import editIcon from "@assets/icons/edit.svg"
import { useMutation } from "@tanstack/react-query"
import { deletePatient } from "@helpers/apis/patient"
import { toast } from "react-toastify"
import { useState } from "react"
import AddPrescription from "@components/molecules/AddPrescription"
import { useNavigate } from "react-router-dom"
import { getDate } from "@helpers/utils"
import { twMerge } from "tailwind-merge"
import ConfirmModel from "@components/molecules/ConfirmModel"
import { handleError } from "@helpers/apis"
import { useAuth } from "@helpers/auth/auth"
import { UserRole } from "@helpers/types"

type Props = {
  data: TPatientData[]
  refetch: Function
  filters: ColumnFilter[]
}

export type TPatientData = {
  id: number
  DMI: string
  index: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
}

export default function PatientTable({ data, refetch, filters }: Props) {
  const { user } = useAuth()
  const mutation = useMutation({
    mutationKey: ["patients"],
    mutationFn: (id: number) => deletePatient(id),
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      refetch()
      toast.success("patient deleted")
    },
  })
  const columnHelper = createColumnHelper<TPatientData>()
  const columns = [
    columnHelper.accessor((row) => row.DMI, {
      id: "DMI",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.firstName, {
      id: "firstName",
      cell: (info) => info.getValue(),
      header: "Prénom",
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => info.getValue(),
      header: "Nom",
    }),
    columnHelper.accessor((row) => row.birthDate, {
      id: "birthDate",
      header: "Date de Naissance",
      cell: (info) => getDate(new Date(info.getValue())),
    }),
    columnHelper.accessor((row) => row.gender, {
      id: "gender",
      cell: (info) => info.getValue(),
      header: "Genre",
    }),
    columnHelper.display({
      id: "prescriptionActions",
      cell: (info) => <PrescriptionActions patient={info.row.original} />,
      header: "Prescription",
    }),
  ]

  if (user && user.role === UserRole.MEDECIN)
    columns.push(
      columnHelper.display({
        id: "Actions",
        cell: (info) => {
          const [deleteConfirm, setDeleteConfirm] = useState(false)
          return (
            <>
              <ConfirmModel
                text={`Voulez-vous vraiment supprimer ce${
                  info.row.original.gender == "Femme" ? "tte" : ""
                } patient${info.row.original.gender == "Femme" ? "e" : ""}?`}
                isOpen={deleteConfirm}
                setIsOpen={setDeleteConfirm}
                confirmFn={() => mutation.mutate(info.row.original.id)}
              />
              <Actions deleteFn={() => setDeleteConfirm(true)} />
            </>
          )
        },
        header: "Actions",
      }),
    )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters: filters,
    },
  })

  return (
    <>
      <table className="container mx-auto text-sm table-fixed border-collapse rounded-xl border-hidden shadow">
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
    </>
  )
}

export type ActionsProps = {
  deleteFn: () => void
}

function Actions({ deleteFn }: ActionsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Icon src={editIcon} />
      <Icon src={deleteIcon} onCLick={deleteFn} />
    </div>
  )
}

type PrescriptionActionsProps = {
  patient: TPatientData
}

function PrescriptionActions({ patient }: PrescriptionActionsProps) {
  const { user } = useAuth()
  const navigator = useNavigate()
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false)
  if (!user) return <div></div>
  return (
    <>
      {user.role === UserRole.MEDECIN && (
        <AddPrescription
          patient={patient}
          isOpen={isPrescriptionOpen}
          setIsOpen={setIsPrescriptionOpen}
        />
      )}
      <div className="flex justify-center gap-4">
        {user.role === UserRole.MEDECIN ? (
          <Icon src={addIcon} onCLick={() => setIsPrescriptionOpen(true)} />
        ) : null}
        <Icon
          src={listIcon}
          onCLick={() => navigator(`${patient.id}/prescription`)}
        />
      </div>
    </>
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
