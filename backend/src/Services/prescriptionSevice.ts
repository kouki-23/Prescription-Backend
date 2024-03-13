import db from "../Config/db"
import { Cure, CureState } from "../Entities/Cure"
import { DetailPrepMolecule } from "../Entities/DetailPrepMolecule"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { Prescription } from "../Entities/Prescription"
import { CreatePrescriptionBody } from "../Middlewares/validation/schema"
import { getDetailByMolecule } from "./detailPrepMoleculeService"
import { getPatientById } from "./patientService"
import { getProtocolWithMolecules } from "./protocolService"

const repo = db.getRepository(Prescription)

// creating of prescription will create all the cures and prep molecule that linked to it
export async function createPrescrptition(data: CreatePrescriptionBody) {
  const [patient, protocol] = await Promise.all([
    getPatientById(data.patientId),
    getProtocolWithMolecules(data.protocolId),
  ])
  let startDate = new Date(data.startDate)
  let prescription = new Prescription(
    data.prescriber,
    data.clinicalTest,
    data.serviceType,
    patient,
    protocol,
    [],
  )

  //get details of molecules to link with prepmolecule
  const detailsMolecules: DetailPrepMolecule[] = []
  await Promise.all(
    protocol.protocolMoleculeAssociation.map(async (p) => {
      const a = await getDetailByMolecule(p.molecule)
      if (a) {
        detailsMolecules.push(a)
      }
    }),
  )

  //creating the first cure
  let cure = new Cure(1, startDate, CureState.EN_COURS, prescription, [])
  protocol.protocolMoleculeAssociation.map((p) => {
    const detail = detailsMolecules.find((d) => d.molecule.id === p.molecule.id)
    if (detail) {
      const prepMolecule: PrepMolecule = new PrepMolecule(
        p.day,
        p.dose,
        cure,
        detail,
      )
      cure.prepMolecule.push(prepMolecule)
    }
  })
  prescription.cures.push(cure)

  for (let i = 2; i <= data.nbCures; i++) {
    startDate.setDate(startDate.getDate() + protocol.intercure)
    cure = new Cure(i, startDate, CureState.EN_PREVU, prescription, [])
    protocol.protocolMoleculeAssociation.map((p) => {
      const detail = detailsMolecules.find(
        (d) => d.molecule.id === p.molecule.id,
      )
      if (detail) {
        const prepMolecule: PrepMolecule = new PrepMolecule(
          p.day,
          p.dose,
          cure,
          detail,
        )
        cure.prepMolecule.push(prepMolecule)
      }
    })
    prescription.cures.push(cure)
  }
  repo.save(prescription)
}

export async function getPrescriptionWithEverythingByPatientId(
  patientId: number,
) {
  return repo.find({
    where: {
      patient: {
        id: patientId,
      },
    },
    relations: {
      patient: true,
      cures: {
        prepMolecule: true,
      },
    },
  })
}