import db from "../Config/db"
import { Patient } from "../Entities/Patient"
import { CreatePatientBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"

export async function createPatient(patientB: CreatePatientBody) {
  const patient = new Patient()
  patient.DMI = patientB.DMI
  patient.birthDate = new Date(patientB.birthDate)
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

export async function getPatientById(id: number) {
  const patient = await db.getRepository(Patient).findOne({
    where: {
      id,
    },
  })
  if (!patient) throw new HttpError("patient not found", StatusCode.NotFound)
  return patient
}
