import Model from "@components/atoms/Model"
import Title from "@components/atoms/Title"
import { Product } from "@helpers/types"
import closeIcon from "@assets/icons/closeDetail.svg"
import { Flacon } from "@pages/Speciality/AddSpeciality"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect } from "react"

type Props = {
  data: Product
  isOpen: boolean
  setIsOpen: (b: boolean) => void
}

export default function DetailsSpeciality({ data, isOpen, setIsOpen }: Props) {
  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen])

  return (
    <Model
      onClose={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
    >
      <div className=" absolute right-96 top-36">
        <img
          src={closeIcon}
          className="size-4 cursor-pointer "
          onClick={() => setIsOpen(false)}
        />
      </div>
      <Title className="text-4xl" text="Détails Specialité" />
      <div className="mt-4">
        <ProductDetails label="Spécialité" text={data.specialite} />
      </div>
      <div className="grid grid-cols-2 gap-6 gap-x-10 mt-6 ml-14">
        <ProductDetails label="Voie" text={data.molecule.way} />
        <ProductDetails label="Molecule" text={String(data.molecule.name)} />

        <ProductDetails
          label="C Min"
          text={String(data.minConcentrarion) + " mg/ml"}
        />
        <ProductDetails
          label="C Max"
          text={String(data.maxConcentrarion) + " mg/ml"}
        />
        <ProductDetails label="Volume" text={String(data.volume) + " ml"} />
        <ProductDetails
          label="Volume Dilution"
          text={String(data.dilutionVolume) + " ml"}
        />
        <ProductDetails
          label="Sensiblilité PVC"
          text={String(data.SensivityPVC ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Abri lumière"
          text={String(data.lightShelter ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Conservation Frigo"
          text={String(data.conservationReconstitutionFridge ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Conservation dilution Frigo"
          text={String(data.conservrationDilutionFridge ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Délai conservation"
          text={String(data.concervationtionPeriodDilution) + " Jours"}
        />
        <ProductDetails
          label="Pret à reconstituer"
          text={String(data.isReconstruct ? "Oui" : "Non")}
        />
        <ProductDetails label="Dosage" text={String(data.dosage) + " mg"} />
        <ProductDetails
          label="Commentaire"
          text={data.comment ? data.comment : "Aucun"}
        />
      </div>
    </Model>
  )
}

function ProductDetails({ label, text }: { label: string; text: string }) {
  return (
    <div className="font-medium space-x-2">
      <span>{label}:</span>
      <span className="text-secondary-blue font-medium">{text}</span>
    </div>
  )
}
type FlaconProps = {
  data: Flacon[]
}
function FlaconDetailedTable({ data }: FlaconProps) {
  const columnHelper = createColumnHelper<Flacon>()
  const columns = [
    columnHelper.accessor((row) => row.dosage, {
      id: "dosage",
      cell: (info) => info.getValue(),
      header: "Dodage",
    }),
    columnHelper.accessor((row) => row.volume, {
      id: "volume",
      cell: (info) => info.getValue(),
      header: "Volume",
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
