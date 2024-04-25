import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { twMerge } from "tailwind-merge"
import editIcon from "@assets/icons/edit.svg"
import deleteIcon from "@assets/icons/delete.svg"
import listIcon from "@assets/icons/list.svg"
import { Product } from "@helpers/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "@helpers/apis/product"
import { handleError } from "@helpers/apis"
import { toast } from "react-toastify"

type Props = {
  data: Product[]
}

export function SpecialtityTable({ data }: Props) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produit supprimé")
    },
  })
  const columnHelper = createColumnHelper<Product>()
  const columns = [
    columnHelper.accessor((row) => row.specialite, {
      id: "specialite",
      cell: (info) => info.getValue(),
      header: "Specialité",
    }),
    columnHelper.accessor((row) => row.molecule.name, {
      id: "dci",
      cell: (info) => info.getValue(),
      header: "Molecule",
    }),
    columnHelper.accessor((row) => row.dosage, {
      id: "dose",
      cell: (info) => info.getValue() + " mg",
      header: "Dose",
    }),
    columnHelper.accessor((row) => row.volume, {
      id: "volume",
      cell: (info) => info.getValue() + " ml",
      header: "Volume",
    }),
    columnHelper.accessor((row) => row.isReconstruct, {
      id: "isReconstruct",
      cell: (info) => (info.getValue() ? "à reconstituer" : "Pret à l'emploi"),
      header: "Statut",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex justify-center gap-4">
            <Icon src={listIcon} />
            <Icon src={editIcon} />
            <Icon
              src={deleteIcon}
              onCLick={() => deleteMutation.mutate(info.row.original.id)}
            />
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <table className="w-full text-sm  border-collapse rounded-xl border-hidden shadow">
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
      </tbody>
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
