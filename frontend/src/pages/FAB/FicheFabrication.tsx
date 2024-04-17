import arianaLogo from "@assets/ariana-logo.png"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { getPrepMoleculeById } from "@helpers/apis/prepMolcule"
import { Product, ProductUsed } from "@helpers/types"
import { addDaysToDate, getDate, getDose } from "@helpers/utils"
import ErrorPage from "@pages/Error/ErrorPage"
import {
  Document,
  Font,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type Props = {}

/*export default function FicheFabrication({}: Props) {
  const { prepid } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prepmolecule", prepid],
    queryFn: () => getPrepMoleculeById(Number(prepid)),
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  const prep = data!.data
  const volumePA = prep.productsUsed.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.volume * curr.frac,
    0,
  )
  const volumeFinal = volumePA + Number(prep.solventVolume)
  const concentration = prep.dose / volumeFinal
  return (
    <div className="mx-10">
      <div className="flex border-2 rounded-3xl items-center justify-between mt-5 px-5">
        <img src={arianaLogo} className="size-20" />
        <h1 className="text-3xl font-bold">FICHE DE FABRICATION</h1>
        <h3>N ordonnance</h3>
      </div>
      <div className="flex justify-between mt-5">
        <div className="border-2 rounded-3xl px-5">
          <div className="flex gap-2  my-3">
            <p className="font-bold text-xl">Patient : </p>
            <p className="text-xl">{`${prep.cure.prescription.patient.firstName} ${prep.cure.prescription.patient.lastName}`}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoText label="DMI" value={prep.cure.prescription.patient.DMI} />
            <InfoText
              label="Index"
              value={prep.cure.prescription.patient.index}
            />
            <InfoText
              label="DDN"
              value={getDate(
                new Date(prep.cure.prescription.patient.birthDate),
              )}
            />
            <InfoText
              label="Genre"
              value={prep.cure.prescription.patient.gender}
            />
            <InfoText
              label="Poids"
              value={prep.cure.prescription.patient.weight}
            />
            <InfoText
              label="Taille"
              value={prep.cure.prescription.patient.height}
            />
            <InfoText
              label="SC"
              value={prep.cure.prescription.patient.bodySurface}
            />
            <InfoText
              label="creatinine"
              value={prep.cure.prescription.patient.creatinine}
            />
          </div>
        </div>
        <div className="border-2 rounded-3xl p-5 px-5">
          <div className="space-y-3">
            <InfoText
              label="Molecule"
              value={prep.productsUsed[0].product.molecule.name}
            />
            <InfoText
              label="Protocol"
              value={prep.cure.prescription.protocolName}
            />
            <InfoText
              label="Dose Prescrite"
              value={`${getDose(
                prep.dose,
                prep.unite,
                prep.cure.prescription.patient,
                prep.productsUsed[0].product.molecule.name,
              )} mg`}
            />
            <InfoText label="Volume final" value={volumeFinal.toFixed(2)} />
            <InfoText
              label="Concentration final"
              value={concentration.toFixed(2) + " mg/ml"}
            />
          </div>
        </div>
        <div className="border-2 rounded-3xl px-5">
          <div className="flex gap-2  my-3">
            <p className="font-bold text-xl">Patient : </p>
            <p className="text-xl">{`${prep.cure.prescription.patient.firstName} ${prep.cure.prescription.patient.lastName}`}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InfoText label="DMI" value={prep.cure.prescription.patient.DMI} />
            <InfoText
              label="Index"
              value={prep.cure.prescription.patient.index}
            />
            <InfoText
              label="DDN"
              value={getDate(
                new Date(prep.cure.prescription.patient.birthDate),
              )}
            />
            <InfoText
              label="Genre"
              value={prep.cure.prescription.patient.gender}
            />
            <InfoText
              label="Poids"
              value={prep.cure.prescription.patient.weight}
            />
            <InfoText
              label="Taille"
              value={prep.cure.prescription.patient.height}
            />
            <InfoText
              label="Taille"
              value={prep.cure.prescription.patient.height}
            />
            <InfoText
              label="SC"
              value={prep.cure.prescription.patient.bodySurface}
            />
            <InfoText
              label="creatinine"
              value={prep.cure.prescription.patient.creatinine}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoText({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-sm">{label}:</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}*/

export default function FicheFabrication({}: Props) {
  const { prepid } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["prepmolecule", prepid],
    queryFn: () => getPrepMoleculeById(Number(prepid)),
  })

  if (isLoading) return <LoadingInterface />
  if (error) return <ErrorPage cause={error.message} />
  const prep = data!.data
  const volumePA = prep.productsUsed.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.volume * curr.frac,
    0,
  )
  const volumeFinal = volumePA + Number(prep.solventVolume)
  const concentration = prep.dose / volumeFinal

  // Create styles
  const styles = StyleSheet.create({
    document: {
      fontSize: 10,
    },
    page: {},
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      border: 2,
      borderRadius: 10,
    },
    logo: {
      width: 80,
      height: 80,
    },
    title: {
      fontFamily: "Helvetica-Bold",
      fontSize: 22,
    },
    flexScreen: {
      marginTop: 20,
      flexDirection: "row",
      marginHorizontal: 15,
      gap: 10,
    },
    itemScreen: {
      flexGrow: 1,
      border: 2,
      borderRadius: 10,
      padding: 8,
    },
    patientItems: {
      flexDirection: "row",
      gap: 10,
      paddingVertical: 4,
    },
    box: {
      marginTop: 20,
      border: 2,
      borderRadius: 10,
      marginHorizontal: 15,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })
  return (
    <PDFViewer className="w-screen h-screen">
      <Document style={styles.document}>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={arianaLogo} style={styles.logo} />
            <Text style={styles.title}>FICHE DE FABRICATION</Text>
            <Text>N'ORDANNACE</Text>
          </View>
          <View style={styles.flexScreen}>
            <View style={styles.itemScreen}>
              <View style={styles.patientItems}>
                <InfoText
                  label="DMI"
                  value={prep.cure.prescription.patient.DMI}
                />
                <InfoText
                  label="Index"
                  value={prep.cure.prescription.patient.index}
                />
              </View>
              <View style={styles.patientItems}>
                <InfoText
                  label="patient"
                  value={`${prep.cure.prescription.patient.firstName} ${prep.cure.prescription.patient.lastName}`}
                />
                <InfoText
                  label="DDN"
                  value={getDate(
                    new Date(prep.cure.prescription.patient.birthDate),
                  )}
                />
              </View>
              <View style={styles.patientItems}>
                <InfoText
                  label="Genre"
                  value={prep.cure.prescription.patient.gender}
                />
                <InfoText
                  label="SC"
                  value={`${prep.cure.prescription.patient.bodySurface} m²`}
                />
              </View>
              <View style={styles.patientItems}>
                <InfoText
                  label="Poid"
                  value={`${prep.cure.prescription.patient.weight} kg`}
                />
                <InfoText
                  label="Taille"
                  value={`${prep.cure.prescription.patient.height} cm`}
                />
              </View>
              <View style={styles.patientItems}>
                <InfoText
                  label="Creatine"
                  value={`${prep.cure.prescription.patient.creatinine} μmol/L`}
                />
                <InfoText
                  label="Clcr"
                  value={`${prep.cure.prescription.patient.clairance} ml/min`}
                />
              </View>
            </View>
            <View
              style={[styles.itemScreen, { flexDirection: "column", gap: 8 }]}
            >
              <InfoText
                label="Molecule"
                value={prep.productsUsed[0].product.molecule.name}
              />
              <InfoText
                label="Protocole"
                value={prep.cure.prescription.protocolName}
              />
              <InfoText
                label="Dose Prescrite"
                value={`${getDose(
                  prep.dose,
                  prep.unite,
                  prep.cure.prescription.patient,
                  prep.productsUsed[0].product.molecule.name,
                )} mg`}
              />
              <InfoText
                label="Volume Final"
                value={volumeFinal.toFixed(2) + " ml"}
              />
              <InfoText
                label="Concentration"
                value={concentration.toFixed(2) + " mg/ml"}
              />
            </View>
            <View
              style={[styles.itemScreen, { flexDirection: "column", gap: 8 }]}
            >
              <InfoText
                label="Date d'administration"
                value={getDate(
                  addDaysToDate(prep.cure.startDate, prep.day - 1),
                )}
              />
              <InfoText label="Jour d'administration" value={`J${prep.day}`} />
              <InfoText
                label="Prescripteur"
                value={`Dr. ${prep.cure.prescription.prescriber}`}
              />
              <InfoText
                label="Primitif"
                value={`${prep.cure.prescription.primitif}`}
              />
              <InfoText
                label="Type Histologique"
                value={`${prep.cure.prescription.histoType}`}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "Helvetica-Bold",
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              Flacons:
            </Text>
            <ProductTable data={prep.productsUsed} />
          </View>
          <View style={styles.box}>
            <InfoText
              label="Vehicule"
              value={`${getStringVehicule(
                prep.vehicule.type,
                prep.vehicule.content,
                prep.vehicule.PVC,
              )} | ${prep.vehicule.volume} ml`}
            />
            <InfoText
              label="Volume Solvant"
              value={`${prep.solventVolume} ml `}
            />
            <InfoText
              label="Volume Final"
              value={`${volumeFinal.toFixed(1)} ml `}
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
function InfoText({ label, value }: { label: string; value: string | number }) {
  const styleInfo = StyleSheet.create({
    label: {
      fontFamily: "Helvetica-Bold",
    },
    view: {
      flexDirection: "row",
    },
  })

  return (
    <View style={styleInfo.view}>
      <Text style={styleInfo.label}>{label} : </Text>
      <Text>{value}</Text>
    </View>
  )
}

function getStringVehicule(
  type: string,
  content: string,
  PVC: boolean,
): string {
  return `${type} ${content} ${PVC !== null && PVC !== false ? "Sans PVC" : ""}`
}

function ProductTable({ data }: { data: ProductUsed[] }) {
  const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 2,
      borderColor: "#000",
      height: 24,
    },
    tableCol: {
      width: "25%",
      borderRightWidth: 2,
      borderColor: "#000",
      paddingLeft: 8,
    },
    tableCell: {
      flex: 1,
    },
  })
  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableRow, { fontFamily: "Helvetica-Bold" }]}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Specialite</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Dosage</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Volume Unitaire</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Quantite</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Dose</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Volume</Text>
        </View>
      </View>
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{row.product.specialite}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{`${row.product.dosage} mg`}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{`${row.product.volume} ml`}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{row.quantity}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {(row.product.dosage * row.quantity * row.frac).toFixed(2) +
                " mg"}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {(row.product.volume * row.quantity * row.frac).toFixed(2) +
                " ml"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}
