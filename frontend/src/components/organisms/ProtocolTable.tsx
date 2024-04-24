import ConfirmModel from "@components/molecules/ConfirmModel"
import { handleError } from "@helpers/apis"
import { deleteProtocol } from "@helpers/apis/protocol"
import { Protocol } from "@helpers/types"
import { useMutation } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { toast } from "react-toastify"
import deleteIcon from "@assets/icons/delete.svg"

type Props = {
  protocols: Protocol[]
  refetch: Function
}

export default function ProtocolTable({ protocols, refetch }: Props) {
  const mutation = useMutation({
    mutationKey: ["protocols"],
    mutationFn: (id: number) => deleteProtocol(id),
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      refetch()
      toast.success("protocol deleted")
    },
  })
  const columnHelper = createColumnHelper<Protocol>()
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Nom Protocole",
    }),
    columnHelper.accessor((row) => row.nbCures, {
      id: "nbCures",
      cell: (info) => info.getValue(),
      header: "Nombres Cures",
    }),
    columnHelper.accessor((row) => row.intercure, {
      id: "intercure",
      cell: (info) => info.getValue(),
      header: "intercure",
    }),
    columnHelper.accessor((row) => row.details, {
      id: "details",
      cell: (info) => info.getValue() || "-",
      header: "details",
    }),
    columnHelper.accessor((row) => row.indications, {
      id: "indications",
      cell: (info) => info.getValue() || "-",
      header: "Indications",
    }),
    columnHelper.accessor((row) => row.disabled, {
      id: "disabled",
      cell: (info) => (!info.getValue() ? "Oui" : "Non"),
      header: "Actif",
    }),
    columnHelper.display({
      id: "Actions",
      cell: (info) => {
        const [deleteConfirm, setDeleteConfirm] = useState(false)
        return (
          <>
            <ConfirmModel
              text={`Voulez-vous vraiment supprimer ce protocole`}
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
  ]

  const table = useReactTable({
    data: protocols,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <>
        <table className="w-full text-sm border-collapse rounded-xl border-hidden shadow">
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
    </div>
  )
}

function Actions({ deleteFn }: { deleteFn: () => void }) {
  return (
    <div className="flex justify-center gap-4">
      <img
        className="w-7 h-7 cursor-pointer"
        src={deleteIcon}
        onClick={deleteFn}
      />
    </div>
  )
}
