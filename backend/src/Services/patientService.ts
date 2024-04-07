import db from "../Config/db"
import { HistoryActions } from "../Entities/HistoryEntities/History"
import { PatientHistory } from "../Entities/HistoryEntities/PatientHistory"
import { Patient } from "../Entities/Patient"
import {
  CreatePatientBody,
  UpdatePatientBody,
} from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getDifference, getHistoryPayload } from "../Utils/helpers"

const repo = db.getRepository(Patient)
const repoHistory = db.getRepository(PatientHistory)

export async function createPatient(
  patientB: CreatePatientBody,
  userId: number,
) {
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

  await repo.save(patient)
  await repoHistory.save(
    new PatientHistory(
      getHistoryPayload(patient),
      userId,
      patient.id,
      HistoryActions.CREATE,
    ),
  )
}

export async function getAllPatients() {
  const patients: Patient[] = await repo.find({
    order: {
      created_at: "DESC",
    },
  })
  return patients
}

export async function getPatientById(id: number) {
  const patient = await repo.findOne({
    where: {
      id,
    },
  })
  if (!patient) throw new HttpError("patient introuvable", StatusCode.NotFound)
  return patient
}

export async function updatePatient(
  id: number,
  p: UpdatePatientBody,
  userId: number,
) {
  const patient = await repo.findOneBy({
    id,
  })
  if (!patient) throw new HttpError("patient introuvable", StatusCode.NotFound)
  const diff = getDifference(patient, p)
  if (diff) {
    await repo.update(
      {
        id,
      },
      p,
    )
    await repoHistory.save(
      new PatientHistory(diff, userId, patient.id, HistoryActions.UPDATE),
    )
  }
}

export async function deletePatient(id: number, userId: number) {
  const patient = await repo.findOneBy({
    id,
  })
  if (!patient) throw new HttpError("patient introuvable", StatusCode.NotFound)
  await repo.softDelete({ id: patient.id })
  await repoHistory.save(
    new PatientHistory(
      getHistoryPayload(patient),
      userId,
      patient.id,
      HistoryActions.DELETE,
    ),
  )
}
