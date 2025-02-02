import { Prescription } from "@helpers/types"
import axios from "axios"

export type CreatePrescriptionData = {
  prescriber: string
  primitif: string
  histoType: string
  nbCures: number
  startDate: string
  clinicalTest: boolean
  comment?: string
  serviceType: string
  patientId: number
  protocolId: number
}

export function createPrescription(data: CreatePrescriptionData) {
  return axios.post("/prescription", data)
}

export function getPrescriptionByPatientId(id: number) {
  return axios.get<Prescription[]>(`/prescription/patient/${id}`)
}

export async function getPrescriptionById(id: number) {
  const res = await axios.get<Prescription>(`/prescription/${id}`)
  return res
}

export async function updatePrescription(id: Number, prescription: any) {
  return axios.patch(`/prescription/${id}`, prescription)
}

export async function deletePrescription(id: Number) {
  return axios.delete(`/prescription/${id}`)
}

export async function updateCureStartDate(
  prescriptionId: number,
  cureId: number,
  newDate: Date,
  cascade: boolean,
) {
  return axios.patch(`/prescription/${prescriptionId}`, {
    cureId,
    date: newDate,
    cascade,
  })
}
