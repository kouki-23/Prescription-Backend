import asqiiLogo from "@assets/asqii_logo.svg"
import LoadingInterface from "@components/organisms/LoadingInterface"
import { getPrepMoleculeById } from "@helpers/apis/prepMolcule"
import { ProductUsed } from "@helpers/types"
import { addDaysToDate, getDate, getDose } from "@helpers/utils"
import ErrorPage from "@pages/Error/ErrorPage"
import {
  Document,
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
      fontSize: 8,
    },
    page: {},
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
      marginHorizontal: 15,
      paddingHorizontal: 10,
      border: 2,
      borderRadius: 5,
    },
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      fontFamily: "Helvetica-Bold",
      fontSize: 20,
    },
    flexScreen: {
      marginTop: 8,
      flexDirection: "row",
      marginHorizontal: 15,
      gap: 10,
    },
    itemScreen: {
      flexGrow: 1,
      border: 2,
      borderRadius: 5,
      padding: 8,
    },
    patientItems: {
      flexDirection: "row",
      gap: 10,
      paddingVertical: 4,
    },
    box: {
      marginTop: 8,
      border: 2,
      borderRadius: 5,
      marginHorizontal: 15,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    fabric: {
      marginTop: 8,
      border: 1,
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
            <Image src={asqiiLogo} style={styles.logo} />
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
              <InfoText label="Heure d'administration" value={prep.time} />
              <InfoText
                label="Prescripteur"
                value={`Dr. ${prep.cure.prescription.prescriber}`}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 4 }}>
            <Text
              style={{
                fontFamily: "Helvetica-Bold",
                fontSize: 18,
                marginVertical: 4,
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
          <View style={styles.box}>
            <InfoText label="Date de fabrication" value={getDate(new Date())} />
            <InfoText
              label="Date de préremption"
              value={getDate(
                addDaysToDate(
                  new Date(),
                  prep.productsUsed[0].product.concervationtionPeriodDilution,
                ),
              )}
            />
            <InfoText
              label="Conservation"
              value={`${volumeFinal.toFixed(1)} ml `}
            />
          </View>
          <View>
            <View style={styles.fabric}>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>Institut X</Text>
                <InfoText
                  label="Patient"
                  value={`${prep.cure.prescription.patient.firstName} ${prep.cure.prescription.patient.lastName}`}
                />
                {/* TODO: change to somme of dose of flacons */}
                <InfoText
                  label="Produit"
                  value={`${prep.dose} mg de ${prep.productsUsed[0].product.specialite}`}
                />
                <InfoText label="Volume final" value={`${volumeFinal} ml`} />
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <InfoText label="N ordannce" value={""} />
                <InfoText
                  label="Date d'adminstration"
                  value={getDate(
                    addDaysToDate(prep.cure.startDate, prep.day - 1),
                  )}
                />
                <InfoText label="Heure d'administration" value={prep.time} />
              </View>
            </View>
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
      borderBottom: 0,
      borderRight: 0,
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
            <Text style={styles.tableCell}>
              {row.frac == 1 ? row.quantity : "1/n"}
            </Text>
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
