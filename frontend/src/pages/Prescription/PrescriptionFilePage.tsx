import LoadingInterface from "@components/organisms/LoadingInterface"
import { getPrescriptionById } from "@helpers/apis/prescription"
import { addDaysToDate, getDate, getDose } from "@helpers/utils"
import ErrorPage from "@pages/Error/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useRef } from "react"
import { useParams } from "react-router-dom"
import { getAge } from "@helpers/personInfo"
import { Cure, Patient, PrepMolecule } from "@helpers/types"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import fileIcon from "@assets/icons/download.svg"

type Props = {}

export default function PrescriptionFilePage({}: Props) {
  const { prescriptionid, cureorder } = useParams()
  console.log(useParams())
  const { isLoading, error, data } = useQuery({
    queryKey: ["prescription", prescriptionid],
    queryFn: () => getPrescriptionById(Number(prescriptionid)),
  })
  const ref = useRef(null)

  const prescription = useMemo(() => data?.data, [data])
  const cure = useMemo(
    () => prescription?.cures[Number(cureorder)],
    [prescription],
  )
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  return (
    <div className="m-10 mx-12">
      {prescription && cure && (
        <>
          <div className="text-sm" ref={ref}>
            <h3 className="font-semibold py-5">
              Le {getDate(new Date())} par Dr.{prescription.prescriber}
            </h3>
            <hr />
            <h3 className="font-semibold py-3 text-2xl">Patient :</h3>
            <div className="grid grid-cols-3 w-fit">
              <Info label="Nom" text={prescription.patient.lastName} />
              <Info label="Prénom" text={prescription.patient.firstName} />
              <Info
                label="Agé"
                text={getAge(new Date(prescription.patient.birthDate))}
              />
              <Info
                label="Poids"
                text={prescription.patient.weight}
                unite="kg"
              />
              <Info
                label="Taille"
                text={prescription.patient.height}
                unite="cm"
              />
              <Info
                label="Surface Corporelle"
                text={prescription.patient.bodySurface}
                unite="m²"
              />
              <Info
                label="Creatinine"
                text={prescription.patient.creatinine}
                unite="µmol/l"
              />
              <Info
                label="Formule"
                text={prescription.patient.clairanceFormula}
              />
              <Info
                label="Clairance de la créatinine"
                text={prescription.patient.clairance}
                unite="ml/min"
              />
            </div>
            <Info label="Commentaire" text={prescription.patient.comment} />
            <h3 className="font-semibold py-3 text-2xl">
              Détails du traitements :
            </h3>
            <Info label="Protocole" text={prescription.protocolName} />
            <Info label="Intercure" text={prescription.intercure + " jours"} />
            <Info
              label="Numéro de la cure"
              text={`${Number(cureorder) + 1} / ${prescription.cures.length}`}
            />
            <Info
              label="Date de début du traitement"
              text={getDate(new Date(cure.startDate))}
            />
            <Info
              label="Commentaire Prescription"
              text={prescription.comment}
            />
            <div className="mt-3">
              <MoleculeTable cure={cure} patient={prescription.patient} />
            </div>
          </div>
          <img
            className="cursor-pointer bg-primary-blue p-3 rounded-full size-12 fixed right-3 bottom-3"
            src={fileIcon}
            onClick={() => window.print()}
          />
        </>
      )}
    </div>
  )
}

function Info({
  label,
  text,
  unite,
}: {
  label: string
  text: string | number | undefined
  unite?: string
}) {
  if (!text) return null
  return (
    <div className="flex gap-2 w-fit">
      <p className="font-semibold">{label}:</p>
      <span>
        {text} {unite}
      </span>
    </div>
  )
}

function MoleculeTable({ cure, patient }: { cure: Cure; patient: Patient }) {
  const columnHelper = createColumnHelper<PrepMolecule>()
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.day, {
        id: "day",
        cell: (info) =>
          `J${info.getValue()} ( ${getDate(
            addDaysToDate(cure.startDate, info.getValue() - 1),
          )} )`,
        header: "Jour",
      }),
      columnHelper.accessor(
        (row) => row.productsUsed[0].product.molecule.name,
        {
          id: "name",
          cell: (info) => info.getValue(),
          header: "Produit",
        },
      ),
      columnHelper.accessor((row) => row.perfusionType, {
        id: "perfusionType",
        cell: (info) => info.getValue(),
        header: "Administration",
      }),
      columnHelper.accessor((row) => row.theoreticalDose + " " + row.unite, {
        id: "doseUniteT",
        cell: (info) => info.getValue(),
        header: "Dose Théorique - Unité",
      }),
      columnHelper.accessor(
        (row) =>
          `${getDose(
            row.theoreticalDose,
            row.unite,
            patient,
            row.productsUsed[0].product.molecule.name,
          )} mg`,
        {
          id: "doseT",
          cell: (info) => info.getValue(),
          header: "Dose Théorique",
        },
      ),
      columnHelper.accessor((row) => `${row.dose} ${row.unite}`, {
        id: "doseAdapteeUnite",
        cell: (info) => info.getValue(),
        header: "Dose Adaptée - Unité",
        size: 50,
      }),
      columnHelper.accessor(
        (row) =>
          `${getDose(
            row.dose,
            row.unite,
            patient,
            row.productsUsed[0].product.molecule.name,
          )} mg`,
        {
          id: "doseAdaptee",
          cell: (info) => info.getValue(),
          header: "Dose Adaptée",
        },
      ),
      columnHelper.accessor(
        (row) => `${Math.round((row.dose / row.theoreticalDose) * 100)}%`,
        {
          id: "dosepersentage",
          cell: (info) => info.getValue(),
          header: "Dose%",
        },
      ),
      columnHelper.accessor((row) => row.time, {
        id: "time",
        cell: (info) => info.getValue(),
        header: "Heure",
      }),
      /* columnHelper.accessor((row) => row.duration, {
      id: "duration",
      cell: (info) => info.getValue() + "h",
      header: "Durée",
    }),*/
      columnHelper.accessor((row) => row.validation, {
        id: "validation",
        cell: (info) =>
          info.getValue() === 1 ? "Validé par medecin" : "Non validée",
        header: "Validation",
      }),
    ],
    [],
  )
  const table = useReactTable({
    data: cure.prepMolecule,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <table className="mt-8 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {useMemo(
          () =>
            table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th className="py-3" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            )),
          [],
        )}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.original.id} className="bg-white dark:bg-gray-800">
            {row.getVisibleCells().map((cell) => (
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                key={cell.row.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
