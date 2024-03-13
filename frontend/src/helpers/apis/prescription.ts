import axios from "axios"

export type CreatePrescriptionData = {
  prescriber: string
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
