import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { handleError } from "@helpers/apis"
import { deleteMolecule, getAllMolecules } from "@helpers/apis/molecule"
import { Molecule } from "@helpers/types"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import addIcon from "@assets/icons/add.svg"
import deleteIcon from "@assets/icons/delete.svg"

export default function ListMolecule() {
  const navigate = useNavigate()
  const { isLoading, error, data } = useQuery({
    queryKey: ["molecules"],
    queryFn: getAllMolecules,
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div>
      <div className="container mx-auto my-8 mt-32 flex justify-between ">
        <Title text="Liste molecules" />
        <img
          className=" size-10 cursor-pointer  "
          src={addIcon}
          onClick={() => navigate("/admin/ajouterMolecule")}
          alt="ajouter specialité"
        />
      </div>
      <MoleculeTable data={data!} />
    </div>
  )
}

function MoleculeTable({ data }: { data: Molecule[] }) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!deleteMutation.isPending) return await deleteMolecule(id)
    },
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["molecules"] })
      toast.success("Molecule supprimé")
    },
  })
  const columnHelper = createColumnHelper<Molecule>()
  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor((row) => row.way, {
      id: "way",
      cell: (info) => info.getValue(),
      header: "Voie",
    }),
    columnHelper.accessor((row) => row.comment, {
      id: "comment",
      cell: (info) => info.getValue() || "-",
      header: "Commentaire",
    }),
    columnHelper.accessor((row) => row.products, {
      id: "products",
      cell: (info) =>
        info.getValue()
          ? info
              .getValue()
              .map((v) => v.specialite + " " + v.dosage + "mg")
              .join(",")
          : "-",
      header: "Products",
    }),
    columnHelper.accessor((row) => row.disabled, {
      id: "disabled",
      cell: (info) => (info.getValue() ? "Oui" : "Non"),
      header: "Actif",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex justify-center gap-4">
            <img
              className="size-7 cursor-pointer"
              src={deleteIcon}
              onClick={() => deleteMutation.mutate(info.row.original.id)}
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
