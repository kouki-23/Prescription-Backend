import Title from "@components/atoms/Title"
import { deleteUser, getAllUsers } from "@helpers/apis/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import addIcon from "@assets/icons/person-add.svg"
import LoadingInterface from "@components/organisms/LoadingInterface"
import ErrorPage from "@pages/Error/ErrorPage"
import { User } from "@helpers/types"
import { handleError } from "@helpers/apis"
import { toast } from "react-toastify"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import editIcon from "@assets/icons/edit.svg"
import deleteIcon from "@assets/icons/delete.svg"
import { twMerge } from "tailwind-merge"

export default function ListUser() {
  const navigate = useNavigate()
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div>
      <div className="container mx-auto my-8 mt-32 flex justify-between ">
        <Title text="Liste utlisateur" />
        <img
          className=" size-10 cursor-pointer  "
          src={addIcon}
          onClick={() => navigate("/admin/ajouterUser")}
          alt="ajouter specialité"
        />
      </div>
      <UserTable data={data!.data} />
    </div>
  )
}

function UserTable({ data }: { data: User[] }) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("Utilisateur supprimé")
    },
  })
  const columnHelper = createColumnHelper<User>()
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
    columnHelper.accessor((row) => row.username, {
      id: "username",
      cell: (info) => info.getValue(),
      header: "Nom d'Utilisateur",
    }),
    columnHelper.accessor((row) => row.role, {
      id: "role",
      cell: (info) => info.getValue(),
      header: "Role",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex justify-center gap-4">
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
