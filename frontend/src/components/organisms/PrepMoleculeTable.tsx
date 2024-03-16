import { Cure } from "@helpers/types"
import { addDaysToDate } from "@helpers/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"

type Props = {
  cure: Cure
}

type TCureData = {
  day: number
  name: string
  dose: number
  unite: string
  doseAdaptee: number
  duree: number
  heure: number
}

export default function PrepMoleculeTable({ cure }: Props) {
  /*const [data, setData] = useState<TCureData[]>(transformCureToDataTable(cure))*/
  const data = useMemo(() => transformCureToDataTable(cure), [cure])
  const columnHelper = createColumnHelper<TCureData>()
  const columns = [
    columnHelper.accessor((row) => row.day, {
      id: "day",
      cell: (info) =>
        "J" +
        info.getValue() +
        `( ${
          addDaysToDate(cure.startDate, info.getValue() - 1)
            .toISOString()
            .split("T")[0]
        } )`,
      header: "Jour",
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Produit",
    }),
    columnHelper.accessor((row) => row.dose + " " + row.unite, {
      id: "doseUnite",
      cell: (info) => info.getValue(),
      header: "Dose - Unite",
    }),
    columnHelper.accessor((row) => row.doseAdaptee, {
      id: "doseAdaptee",
      cell: (info) => info.getValue(),
      header: "Dose Adaptee",
    }),
    columnHelper.accessor((row) => (row.doseAdaptee / row.dose) * 100, {
      id: "dosepersentage",
      cell: (info) => info.getValue() + "%",
      header: "Dose%",
    }),
    /*columnHelper.accessor((row) => row.duree, {
      id: "duree",
      cell: (info) => info.getValue(),
      header: "Duree",
    }),*/
    columnHelper.display({
      id: "Action",
      cell: () => <Action />,
      header: "Action",
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div>
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
      </div>
      <pre>{JSON.stringify(cure, null, 2)}</pre>
    </>
  )
}

function Action() {
  return (
    <div className="flex justify-center">
      <div className="size-7 bg-primary-red bg-opacity-50 border-primary-red border-2 rounded-full"></div>
    </div>
  )
}

function transformCureToDataTable(cure: Cure): TCureData[] {
  return cure.prepMolecule.map((p) => {
    return {
      day: p.day,
      name: p.details.molecule.name,
      dose: p.dose,
      unite: p.unite,
      doseAdaptee: p.dose,
      duree: 0,
      heure: 0,
    } as TCureData
  })
}
