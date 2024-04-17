import { PrepMolecule, ProductUsed } from "@helpers/types"
import { getDate, getDose, getPersentage } from "@helpers/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { addDaysToDate } from "@helpers/utils"
import adjustementIcon from "@assets/icons/adjustement.svg"
import adjustementFilledIcon from "@assets/icons/adjustementFilled.svg"
import ficherIcon from "@assets/icons/ficher.svg"
import checkIcon from "@assets/icons/checkCircle.svg"
import checkedIcon from "@assets/icons/checkCircleGreen.svg"
import { useNavigate } from "react-router-dom"
import ConfirmModel from "@components/molecules/ConfirmModel"
import { useState } from "react"
import {
  libratePrepMolecule,
  updatePrepMolecule,
} from "@helpers/apis/prepMolcule"
import { toast } from "react-toastify"
import { handleError } from "@helpers/apis"
import { useMutation } from "@tanstack/react-query"
import Model from "@components/atoms/Model"
import Title from "@components/atoms/Title"

type Props = {
  data: PrepMolecule[]
  refetch: Function
}

export default function AdjustementTable({ data, refetch }: Props) {
  const navigator = useNavigate()
  const columnHelper = createColumnHelper<PrepMolecule>()
  const columns = [
    columnHelper.accessor(
      (row) => getDate(addDaysToDate(row.cure.startDate, row.day - 1)),
      {
        id: "date",
        cell: (info) => info.getValue(),
        header: "Date",
      },
    ),
    columnHelper.accessor((row) => row.time, {
      id: "time",
      cell: (info) => info.getValue(),
      header: "Heure",
    }),
    columnHelper.accessor((row) => row.productsUsed[0].product.molecule.name, {
      id: "molecule",
      cell: (info) => info.getValue(),
      header: "Molecule",
    }),
    columnHelper.accessor(
      (row) =>
        getDose(
          row.dose,
          row.unite,
          row.cure.prescription.patient,
          row.productsUsed[0].product.molecule.name,
        ),
      {
        id: "dose",
        cell: (info) => info.getValue() + " mg",
        header: "Dose",
      },
    ),
    columnHelper.accessor(
      (row) =>
        `${row.cure.prescription.patient.firstName} ${row.cure.prescription.patient.lastName}`,
      {
        id: "patient",
        cell: (info) => info.getValue(),
        header: "Patient",
      },
    ),
    columnHelper.accessor((row) => row.cure.prescription.protocolName, {
      id: "protocol",
      cell: (info) => info.getValue(),
      header: "Protocol",
    }),
    columnHelper.display({
      id: "adjustement",
      cell: (info) => {
        const [isOpen, setIsOpen] = useState(false)
        return (
          <>
            {info.row.original.isAdjusted && info.row.original.vehicule && (
              <AdjustModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={info.row.original}
                refetch={refetch}
              />
            )}
            <div className="flex justify-center">
              <img
                src={
                  info.row.original.isAdjusted
                    ? adjustementFilledIcon
                    : adjustementIcon
                }
                className="size-8 cursor-pointer"
                onClick={() =>
                  info.row.original.isAdjusted
                    ? setIsOpen(true)
                    : navigator(`adjust/${info.row.original.id}`)
                }
              />
            </div>
          </>
        )
      },
      header: "Ajustement",
      size: 100,
    }),
    columnHelper.display({
      id: "fiche",
      cell: (info) => (
        <div className="flex justify-center">
          <img
            onClick={
              info.row.original.isAdjusted
                ? () => {
                    navigator(`/FAB/${info.row.original.id}`)
                  }
                : () => {}
            }
            src={ficherIcon}
            className="size-7 cursor-pointer"
          />
        </div>
      ),
      header: "Fiche",
      size: 100,
    }),
    columnHelper.display({
      id: "finish",
      cell: (info) => {
        const [confirmFinish, setConfirmFinish] = useState<boolean>(false)
        const finishMut = useMutation({
          mutationKey: ["prepMolecule", "finish", info.row.original.id],
          mutationFn: () =>
            updatePrepMolecule(info.row.original.id, {
              finished: !info.row.original.finished,
            }),
          onError: (e) => {
            toast.error(handleError(e))
          },
          onSuccess: () => {
            toast.success("Mise à jour avec succès")
            refetch()
            setConfirmFinish(false)
          },
        })
        return (
          <>
            <ConfirmModel
              isOpen={confirmFinish}
              setIsOpen={setConfirmFinish}
              text="confirmation"
              confirmFn={finishMut.mutate}
            />
            <div className="flex justify-center">
              <img
                onClick={
                  info.row.original.isAdjusted
                    ? () => setConfirmFinish(true)
                    : () => {}
                }
                src={info.row.original.finished ? checkedIcon : checkIcon}
                className="size-7 cursor-pointer"
              />
            </div>
          </>
        )
      },
      header: "Terminer",
      size: 100,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
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
                <td
                  className="text-center py-3"
                  style={{
                    width:
                      cell.column.getSize() !== 150
                        ? cell.column.getSize()
                        : undefined,
                  }}
                  key={cell.id}
                >
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

function AdjustModel({
  data,
  isOpen,
  setIsOpen,
  refetch,
}: {
  data: PrepMolecule
  isOpen: boolean
  setIsOpen: (b: boolean) => void
  refetch: Function
}) {
  const librateMut = useMutation({
    mutationKey: ["prepMolecule", "librate", data.id],
    mutationFn: () => libratePrepMolecule(data.id),
    onError: (e) => {
      toast.error(handleError(e))
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      refetch()
      setIsOpen(false)
    },
  })

  const dose = getDose(
    data.dose,
    data.unite,
    data.cure.prescription.patient,
    data.productsUsed[0].product.molecule.name,
  )
  const doseTheo = getDose(
    data.theoreticalDose,
    data.unite,
    data.cure.prescription.patient,
    data.productsUsed[0].product.molecule.name,
  )
  const volumePA = data.productsUsed.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.volume * curr.frac,
    0,
  )
  const volumeFinal = volumePA + Number(data.solventVolume)
  const concentration = data.dose / volumeFinal
  return (
    <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Title text="Ajustement" className="font-bold text-2xl" />
      <div className="grid grid-cols-3 mt-12 gap-4">
        <LabledInfo
          label="Patient"
          text={
            data.cure.prescription.patient.firstName +
            " " +
            data.cure.prescription.patient.lastName
          }
        />
        <LabledInfo
          label="Molecule"
          text={data.productsUsed[0].product.molecule.name}
        />
        <LabledInfo
          label="Date"
          text={getDate(addDaysToDate(data.cure.startDate, data.day - 1))}
        />
        <LabledInfo
          label="Vehicule"
          text={`${data.vehicule.type} ${data.vehicule.content} ${
            data.vehicule.PVC ? "" : "Sans PVC"
          } | ${data.vehicule.volume}ml `}
        />
        <LabledInfo label="Volume Solvant" text={data.solventVolume + " ml"} />
        <LabledInfo label="Dose prescrite" text={doseTheo + " mg"} />
        <LabledInfo label="Dose ajusté" text={dose + " mg"} />
        <LabledInfo
          label="Ratio"
          text={getPersentage(data.dose, data.theoreticalDose) + "%"}
        />
        <LabledInfo
          label="Sensibilité lumière"
          text={data.productsUsed[0].product.lightShelter ? "Oui" : "Non"}
        />
        <LabledInfo label="Volume PA" text={volumePA.toFixed(2) + " ml"} />
        <LabledInfo
          label="Volume final"
          text={volumeFinal.toFixed(2) + " ml"}
        />
        <LabledInfo
          label="Sensibilité PVC"
          text={data.productsUsed[0].product.SensivityPVC ? "Oui" : "Non"}
        />
        <LabledInfo
          label="CCmin"
          text={String(data.productsUsed[0].product.minConcentrarion + "mg/ml")}
        />
        <LabledInfo
          label="Concentration"
          text={concentration.toFixed(2) + "mg/ml"}
        />
        <LabledInfo
          label="CCmax"
          text={data.productsUsed[0].product.maxConcentrarion + "mg/ml"}
        />
        <LabledInfo
          label="à reconstituer"
          text={data.productsUsed[0].product.isReconstruct ? "Oui" : "Non"}
        />
        {data.productsUsed[0].product.isReconstruct && (
          <LabledInfo
            label="volume de reconstitution"
            text={data.productsUsed[0].product.volumeReconstitution + " ml"}
          />
        )}
      </div>
      <div className="my-10 space-y-4 w-full">
        <Title text="Flacon" className="font-bold text-xl" />
        <ProductUsedTable data={data.productsUsed} />
      </div>
      <div className="flex justify-center gap-20">
        <button
          onClick={() => librateMut.mutate()}
          className="bg-secondary-blue bg-opacity-85 rounded-2xl px-8 py-3 text-white-shade font-bold hover:bg-opacity-100"
        >
          Libérer
        </button>
      </div>
    </Model>
  )
}

function LabledInfo({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-1">
      <p className="text-primary-blue font-bold">{label}:</p>
      <p className="text-primary-blue">{text}</p>
    </div>
  )
}

function ProductUsedTable({ data }: { data: ProductUsed[] }) {
  const columnHelper = createColumnHelper<ProductUsed>()
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
      cell: (info) =>
        info.row.original.frac == 1
          ? info.getValue()
          : `~1/${Math.round(1 / info.row.original.frac)}`,
      header: "Quantité",
    }),
    columnHelper.accessor(
      (row) => row.product.dosage * row.quantity * row.frac,
      {
        id: "dose",
        cell: (info) => info.getValue().toFixed(2) + "mg",
        header: "Dose",
      },
    ),
    columnHelper.accessor(
      (row) => row.product.volume * row.quantity * row.frac,
      {
        id: "volumePrev",
        cell: (info) => info.getValue().toFixed(2) + "ml",
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
    <table className="w-full text-sm table-auto border-collapse rounded-xl border-hidden shadow">
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
        <tr className="text-secondary-blue text-center border-t-2 border-gray-table">
          <td className="py-3">Total</td>
          <td colSpan={3}></td>
          <td className="py-3">
            {data
              .reduce(
                (prev, curr) =>
                  prev + curr.frac * curr.quantity * curr.product.dosage,
                0,
              )
              .toFixed(2)}
            mg
          </td>
          <td className="py-3">
            {data
              .reduce(
                (prev, curr) =>
                  prev + curr.frac * curr.quantity * curr.product.volume,
                0,
              )
              .toFixed(2)}
            ml
          </td>
        </tr>
      </tbody>
    </table>
  )
}
