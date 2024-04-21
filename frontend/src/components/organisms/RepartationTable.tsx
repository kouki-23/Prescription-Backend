import TextInput from "@components/atoms/TextInput"
import { PartialProduct } from "@pages/Adjustement/AdjustementDetailsPage"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

type Props = {
  data: PartialProduct[]
  setData: (data: PartialProduct[]) => void
}

export default function RepartationTable({ data, setData }: Props) {
  const columnHelper = createColumnHelper<PartialProduct>()

  const columns = [
    columnHelper.accessor((row) => row.product.specialite, {
      id: "specialite",
      cell: (info) => info.getValue(),
      header: "Specialité",
    }),
    columnHelper.accessor((row) => row.product.dosage, {
      id: "dosage",
      cell: (info) => info.getValue() + " mg",
      header: "Dosage",
    }),
    columnHelper.accessor((row) => row.product.volume, {
      id: "volume",
      cell: (info) => info.getValue() + " ml",
      header: "Volume",
    }),
    columnHelper.accessor((row) => row.quantity, {
      id: "quantity",
      cell: (info) => {
        const initValue = info.getValue()
        const [value, setValue] = useState(String(initValue))
        function setChanges(s: string) {
          let newData = [...data]
          newData[info.row.index] = {
            ...newData[info.row.index],
            quantity: Number(s),
          }
          setData(newData)
        }
        return (
          <div className="flex justify-center">
            <TextInput
              className="w-1/2"
              value={String(value)}
              setValue={setValue}
              isNumber={true}
              onBlur={() => setChanges(value)}
            />
          </div>
        )
      },
      header: "Quantité",
    }),
    columnHelper.accessor(
      (row) => row.product.dosage * row.quantity * row.frac,
      {
        id: "dose",
        cell: (info) => info.getValue().toFixed(2),
        header: "Dose",
      },
    ),
    columnHelper.accessor(
      (row) => row.product.volume * row.quantity * row.frac,
      {
        id: "volumePrev",
        cell: (info) => info.getValue().toFixed(2),
        header: "Volume à prélever",
      },
    ),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
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
    </div>
  )
}
