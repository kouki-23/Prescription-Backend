import db from "../Config/db"
import { Cure, CureState } from "../Entities/Cure"
import { Product } from "../Entities/Product"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { Prescription } from "../Entities/Prescription"
import { CreatePrescriptionBody } from "../Middlewares/validation/schema"
import { getProductByMolecule } from "./productService"
import { getPatientById } from "./patientService"
import { getProtocolWithMolecules } from "./protocolService"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { ProductUsed } from "../Entities/ProductUsed"

const repo = db.getRepository(Prescription)

// creating of prescription will create all the cures and prep molecule that linked to it
export async function createPrescrptition(data: CreatePrescriptionBody) {
  const [patient, protocol] = await Promise.all([
    getPatientById(data.patientId),
    getProtocolWithMolecules(data.protocolId),
  ])
  let startDate = new Date(data.startDate)
  let prescription = new Prescription(
    protocol.name,
    protocol.intercure,
    data.prescriber,
    data.clinicalTest,
    data.primitif,
    data.histoType,
    patient.id,
    [],
  )

  //get products to link with prepmolecule
  const products: Product[] = []
  await Promise.all(
    protocol.protocolMoleculeAssociation.map(async (p) => {
      const product = await getProductByMolecule(p.molecule)
      products.push(product)
    }),
  )

  //creating the first cure
  let cure = new Cure(startDate, CureState.EN_COURS, prescription, [])
  protocol.protocolMoleculeAssociation.map((p) => {
    const product = products.find((p) => p.molecule.id === p.molecule.id)
    if (product) {
      const prepMolecule: PrepMolecule = new PrepMolecule(
        p.day,
        p.dose,
        p.unite,
        p.perfusionType,
        false,
        cure,
        [],
      )
      const productUsed = new ProductUsed(prepMolecule, product.id, 0)
      prepMolecule.productsUsed.push(productUsed)
      cure.prepMolecule.push(prepMolecule)
    }
  })
  prescription.cures.push(cure)

  for (let i = 2; i <= data.nbCures; i++) {
    startDate.setDate(startDate.getDate() + protocol.intercure)
    cure = new Cure(startDate, CureState.PREVU, prescription, [])
    protocol.protocolMoleculeAssociation.map((p) => {
      const product = products.find((p) => p.molecule.id === p.molecule.id)
      if (product) {
        const prepMolecule: PrepMolecule = new PrepMolecule(
          p.day,
          p.dose,
          p.unite,
          p.perfusionType,
          false,
          cure,
          [],
        )
        const productUsed = new ProductUsed(prepMolecule, product.id, 0)
        prepMolecule.productsUsed.push(productUsed)
        cure.prepMolecule.push(prepMolecule)
      }
    })
    prescription.cures.push(cure)
  }
  await repo.save(prescription)
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
        prepMolecule: {
          productsUsed: {
            product: {
              molecule: true,
            },
          },
        },
      },
    },
  })
}

export async function getPrescriptionById(id: number) {
  const result = await repo.findOne({
    where: {
      id,
    },
    relations: {
      patient: true,
      cures: {
        prepMolecule: {
          productsUsed: {
            product: {
              molecule: true,
            },
          },
        },
      },
    },
  })
  if (!result) {
    throw new HttpError("prescription introuvable ", StatusCode.NotFound)
  }
  return result
}

export async function updatePrescription(id: number, prescription: any) {
  return repo.update({ id }, prescription)
}

export async function deletePrescription(id: number) {
  return repo.delete({ id })
}
