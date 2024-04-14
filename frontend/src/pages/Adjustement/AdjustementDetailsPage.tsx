import OptionInput from "@components/atoms/OptionInput"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import LoadingInterface from "@components/organisms/LoadingInterface"
import {
  adjustPrepMolecule,
  getPrepMoleculeById,
} from "@helpers/apis/prepMolcule"
import { getProductsOfMolecule } from "@helpers/apis/product"
import { getAllVehicules } from "@helpers/apis/vehicule"
import { Option, PrepMolecule, Product, Vehicule } from "@helpers/types"
import ErrorPage from "@pages/Error/ErrorPage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDate, getDose, getPersentage } from "@helpers/utils"
import { addDaysToDate } from "../../helpers/utils"
import RepartationTable from "@components/organisms/RepartationTable"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import { toast } from "react-toastify"
import { handleError } from "@helpers/apis"

export type PartialProduct = {
  product: Product
  quantity: number
  frac: number // persentage 1 => 100%
}

type FormData = {
  dilution: [string, string, boolean] // type , content , PVC
  volumedilution: number
  condFinal: string
  volumeSolvant: number
  repartitionProducts: PartialProduct[]
  fractionProducts: PartialProduct[]
}

// TODO : can be optimized by making 2 query at the same time (we can pass moleculeId in the params or make api that send both )
export default function AdjustementDetailsPage() {
  const { prepid } = useParams()
  const navigator = useNavigate()
  const [data, setData] = useState<FormData>({
    dilution: ["", "", false], // i am stupid i used array for future updated change it to object
    condFinal: "",
    volumedilution: 0,
    volumeSolvant: 0,
    repartitionProducts: [],
    fractionProducts: [],
  })

  const adjustMut = useMutation({
    mutationKey: ["prepMolecule", "adjust"],
    // TODO : for now it is any fix it
    mutationFn: (data: any) => adjustPrepMolecule(Number(prepid), data),
    onError: (e) => {
      toast.error(handleError(e))
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès")
      navigator(-1)
    },
  })

  const [dilutionVolumesOption, setDilutionVolumesOption] = useState<
    Option<number>[]
  >([])

  const {
    isLoading: isLoadingVeh,
    error: errorVeh,
    data: vehicules,
  } = useQuery({
    queryKey: ["vehicules"],
    queryFn: getAllVehicules,
  })

  const {
    isLoading: isLoadingPreps,
    error: errorPreps,
    data: preps,
  } = useQuery({
    queryKey: ["prepmolecule", prepid],
    queryFn: () => getPrepMoleculeById(Number(prepid)),
  })

  let moleculeId = preps?.data.productsUsed[0].product.molecule.id

  const {
    isLoading: isLoadingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ["products", "molecule", moleculeId],
    queryFn: () => getProductsOfMolecule(Number(moleculeId!)),
    enabled: !!moleculeId,
  })

  const prepMolecule: PrepMolecule | null = useMemo(
    () => (preps ? preps.data : null),
    [preps],
  )
  const dose = useMemo(() => {
    if (prepMolecule)
      return getDose(
        prepMolecule.dose,
        prepMolecule.unite,
        prepMolecule.cure.prescription.patient,
        prepMolecule.productsUsed[0].product.molecule.name,
      )
  }, [prepMolecule?.dose])
  const doseTheo = useMemo(() => {
    if (prepMolecule)
      return getDose(
        prepMolecule.theoreticalDose,
        prepMolecule.unite,
        prepMolecule.cure.prescription.patient,
        prepMolecule.productsUsed[0].product.molecule.name,
      )
  }, [prepMolecule?.theoreticalDose])

  // TODO : you can optimize this will make web render 3+ times
  useEffect(() => {
    if (products && dose) {
      if (
        data.repartitionProducts.length === 0 &&
        data.fractionProducts.length === 0
      ) {
        let doseNumber = Number(dose)
        let repartitions: PartialProduct[] = [
          {
            product: products.data[0],
            quantity: Math.floor(doseNumber / products.data[0].dosage),
            frac: 1,
          },
        ]
        let fractions: PartialProduct[] = [
          {
            product: products.data[0],
            quantity: 1,
            frac:
              doseNumber / products.data[0].dosage -
              Math.floor(doseNumber / products.data[0].dosage),
          },
        ]

        repartitions.push(
          ...products.data.slice(1).map((product) => ({
            product: product,
            quantity: 0,
            frac: 1,
          })),
        )
        fractions.push(
          ...products.data.slice(1).map((product) => ({
            product: product,
            quantity: 0,
            frac: 1,
          })),
        )
        setData({
          ...data,
          repartitionProducts: repartitions,
          fractionProducts: fractions,
        })
      }
    }
  }, [products])

  useEffect(() => {
    if (vehicules) {
      let volumes: number[] = []
      for (let i = 0; i < vehicules.data.length; i++) {
        let v = vehicules.data[i]
        if (
          getStringVehicule(v.type, v.content, v.PVC) ===
          getStringVehicule(
            data.dilution[0],
            data.dilution[1],
            data.dilution[2],
          )
        ) {
          setData({
            ...data,
            condFinal: getStringVehicule(
              data.dilution[0],
              data.dilution[1],
              data.dilution[2],
            ),
          })
        }
        if (
          data.dilution[0] === v.type &&
          data.dilution[1] === v.content &&
          data.dilution[2] === v.PVC
        ) {
          volumes.push(v.volume)
        }
      }
      setDilutionVolumesOption(
        volumes.map((v) => ({
          value: v,
          label: String(v) + " ml",
        })),
      )
    }
  }, [data.dilution])

  useEffect(() => {}, [products])

  useEffect(() => {
    setData({
      ...data,
      volumeSolvant: data.volumedilution,
    })
  }, [data.volumedilution])

  const isLoading = isLoadingVeh || isLoadingPreps || isLoadingProducts
  const error = errorVeh || errorPreps || errorProducts
  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />

  const dilutionOptions: Option<[string, string, boolean]>[] =
    transformToOptionDilution(vehicules!.data)
  const condOptions: Option<string>[] = transformToOptionCond(vehicules!.data)

  return (
    <div className="container mx-auto mt-12">
      <Title text="Ajustement" className="font-bold" />
      <div className="flex flex-col justify-center mx-24">
        <div className="flex justify-between mt-12">
          <div className="space-y-2">
            <p className="text-primary-blue text-xl font-medium">Dilution</p>
            <OptionInput
              options={dilutionOptions}
              selected={dilutionOptions.find(
                (v) => v.value.toString() === data.dilution.toString(),
              )}
              setSelected={(option) =>
                setData({ ...data, dilution: option.value })
              }
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <p className="text-primary-blue text-xl font-medium">
              Volume dilution
            </p>
            <OptionInput
              options={dilutionVolumesOption}
              selected={dilutionVolumesOption.find(
                (v) => v.value === data.volumedilution,
              )}
              setSelected={(option) =>
                setData({ ...data, volumedilution: option.value })
              }
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <p className="text-primary-blue text-xl font-medium">
              Conditionnement final
            </p>
            <OptionInput
              options={condOptions}
              selected={condOptions.find((v) => v.value === data.condFinal)}
              setSelected={(option) =>
                setData({ ...data, condFinal: option.value })
              }
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <p className="text-primary-blue text-xl font-medium">
              Volume Solvant
            </p>
            <TextInput
              value={data.volumeSolvant}
              setValue={(s) => setData({ ...data, volumeSolvant: Number(s) })}
              isNumber={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-16 gap-8">
          <LabledInfo
            label="Patient"
            text={
              preps!.data.cure.prescription.patient.firstName +
              " " +
              preps!.data.cure.prescription.patient.lastName
            }
          />
          <LabledInfo
            label="Molecule"
            text={prepMolecule!.productsUsed[0].product.molecule.name}
          />
          <LabledInfo
            label="Date"
            text={getDate(
              addDaysToDate(prepMolecule!.cure.startDate, preps!.data.day - 1),
            )}
          />
          <LabledInfo label="Dose prescrite" text={doseTheo + " mg"} />
          <LabledInfo label="Dose ajusté" text={dose + " mg"} />
          <LabledInfo
            label="Ratio"
            text={
              getPersentage(prepMolecule!.dose, prepMolecule!.theoreticalDose) +
              "%"
            }
          />
          <LabledInfo
            label="Sensibilité lumière"
            text={
              prepMolecule!.productsUsed[0].product.lightShelter ? "Oui" : "Non"
            }
          />
          <LabledInfo
            label="Volume PA"
            text={
              calculVolumePA(
                data.repartitionProducts,
                data.fractionProducts,
              ).toFixed(2) + " ml"
            }
          />
          <LabledInfo
            label="Volume final"
            text={
              calculFinalVolume(
                data.volumeSolvant,
                data.repartitionProducts,
                data.fractionProducts,
              ) + "ml"
            }
          />
          <LabledInfo
            label="CCmin"
            text={String(
              prepMolecule!.productsUsed[0].product.minConcentrarion + "mg/ml",
            )}
          />
          <LabledInfo
            label="Concentration"
            text={
              calculConcentration(
                Number(dose!),
                calculVolumePA(data.repartitionProducts, data.fractionProducts),
                data.volumeSolvant,
              ).toFixed(2) + "mg/ml"
            }
          />
          <LabledInfo
            label="CCmax"
            text={
              prepMolecule!.productsUsed[0].product.maxConcentrarion + "mg/ml"
            }
          />
          <LabledInfo
            label="Sensibilité PVC"
            text={
              prepMolecule!.productsUsed[0].product.SensivityPVC ? "Oui" : "Non"
            }
          />
          <LabledInfo
            label="Pret à reconstituer"
            text={
              prepMolecule!.productsUsed[0].product.isReconstruct
                ? "Oui"
                : "Non"
            }
          />
          {prepMolecule!.productsUsed[0].product.isReconstruct && (
            <LabledInfo
              label="volume de reconstitution"
              text={
                prepMolecule!.productsUsed[0].product.volumeReconstitution +
                " ml"
              }
            />
          )}
        </div>
        <div className="mt-12 space-y-8">
          <div>
            <Title text="Repartition" className="py-2 text-3xl font-semibold" />
            <RepartationTable
              data={data.repartitionProducts}
              setData={(d) => {
                setData({ ...data, repartitionProducts: d })
              }}
            />
          </div>
          <div>
            <Title text="Fraction" className="py-2 text-3xl font-semibold" />
            <RepartationTable
              data={data.fractionProducts}
              setData={(d) => {
                setData({ ...data, fractionProducts: d })
              }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-20 my-14">
          <SecondaryBtn
            className="px-8"
            text="Annuler"
            clickFn={() => navigator(-1)}
          />
          <PrimaryBtn
            className="px-8"
            text="Enregistrer"
            clickFn={() => {
              const veh = vehicules!.data.find(
                (veh) =>
                  veh.type === data.dilution[0] &&
                  veh.content === data.dilution[1] &&
                  veh.PVC === data.dilution[2] &&
                  veh.volume === data.volumedilution,
              )
              const repartition = data.repartitionProducts.map((r) => ({
                productId: r.product.id,
                quantity: r.quantity,
                frac: r.frac,
              }))
              const fraction = data.fractionProducts.map((r) => ({
                productId: r.product.id,
                quantity: r.quantity,
                frac: r.frac,
              }))
              adjustMut.mutate({
                vehiculeId: veh!.id,
                condFinal: data.condFinal,
                volumeSolvant: data.volumeSolvant,
                repartitionProducts: repartition,
                fractionProducts: fraction,
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

function LabledInfo({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-2">
      <p className="text-primary-blue font-bold text-lg">{label}:</p>
      <p className="text-primary-blue text-lg">{text}</p>
    </div>
  )
}

function transformToOptionDilution(
  vehicules: Vehicule[],
): Option<[string, string, boolean]>[] {
  const values = getUnqiueVehicules(vehicules)
  return values.map((v) => ({
    value: v as [string, string, boolean],
    label: getStringVehicule(v[0], v[1], v[2]),
  }))
}

function transformToOptionCond(vehicules: Vehicule[]) {
  const addedValues = [
    "Seringue 1 ml",
    "Seringue 2 ml",
    "Seringue 5 ml",
    "Seringue 50 ml",
  ].map((v) => ({
    label: v,
    value: v,
  }))
  const values = getUnqiueVehicules(vehicules)
  return [
    ...values.map((v) => ({
      value: getStringVehicule(v[0], v[1], v[2]),
      label: getStringVehicule(v[0], v[1], v[2]),
    })),
    ...addedValues,
  ]
}

function getUnqiueVehicules(vehicules: Vehicule[]) {
  let values: [string, string, boolean][] = []
  for (let i = 0; i < vehicules.length; i++) {
    let v = vehicules[i]
    if (
      !values.find(
        (a) => a[0] === v.type && a[1] === v.content && a[2] === v.PVC,
      )
    ) {
      values.push([v.type, v.content, v.PVC])
    }
  }
  return values
}

function getStringVehicule(
  type: string,
  content: string,
  PVC: boolean,
): string {
  return `${type} ${content} ${PVC !== null && PVC !== false ? "Sans PVC" : ""}`
}

function calculVolumePA(
  repartition: PartialProduct[],
  fraction: PartialProduct[],
) {
  let reparVolume = repartition.reduce(
    (prev, curr) => prev + curr.product.volume * curr.quantity,
    0,
  )
  let fracVolume = fraction.reduce(
    (prev, curr) => prev + curr.product.volume * curr.quantity * curr.frac,
    0,
  )
  return reparVolume + fracVolume
}

function calculFinalVolume(
  volume: number,
  repartition: PartialProduct[],
  fraction: PartialProduct[],
): number {
  return Math.round(volume + calculVolumePA(repartition, fraction))
}

function calculConcentration(
  dose: number,
  volumePA: number,
  volumeSolvant: number,
): number {
  return dose / (volumePA + volumeSolvant)
}
