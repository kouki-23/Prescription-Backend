import db from "../Config/db"
import { Patient } from "../Entities/Patient"
import { CreatePatientBody } from "../Middlewares/validation/schema"

export async function createPatient(patientB: CreatePatientBody) {
  const patient = new Patient()
  patient.DMI = patientB.DMI
  patient.birthDate = patientB.birthDate
  patient.bodySurface = patientB.bodySurface
  patient.clairance = patientB.clairance
  patient.clairanceFormula = patientB.clairanceFormula
  patient.comment = patientB.comment
  patient.creatinine = patientB.creatinine
  patient.firstName = patientB.firstName
  patient.gender = patientB.gender
  patient.height = patientB.height
  patient.index = patientB.index
  patient.lastName = patientB.lastName
  patient.matrimonial = patientB.matrimonial
  patient.weight = patientB.weight
  patient.serviceType = patientB.serviceType
  return await db.getRepository(Patient).save(patient)
}

export async function getAllPatients() {
  const patients: Patient[] = await db.getRepository(Patient).find()
  return patients
}
