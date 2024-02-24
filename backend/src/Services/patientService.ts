import db from "../Config/db"
import { Patient } from "../Entities/Patient"
import {
  CreatePatientBody,
  UpdatePatientBody,
} from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"

const repo = db.getRepository(Patient)

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
  return await repo.save(patient)
}

export async function getAllPatients() {
  const patients: Patient[] = await repo.find()
  return patients
}

export async function getPatientById(id: number) {
  const patient = await repo.findOne({
    where: {
      id,
    },
  })
  if (!patient) throw new HttpError("patient not found", StatusCode.NotFound)
  return patient
}

export async function updatePatient(id: number, p: UpdatePatientBody) {
  const result = await repo.update(
    {
      id,
    },
    p,
  )
  if (!result.affected || result.affected === 0) return false
  return true
}

export async function deletePatient(id: number) {
  const result = await repo.delete({
    id,
  })
  if (!result.affected || result.affected === 0) return false
  return true
}
