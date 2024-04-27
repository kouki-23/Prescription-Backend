import axios from "axios"
import { Patient } from "@helpers/types"

export async function getAllPatients() {
  const response = await axios.get<Patient[]>("/patient/")
  return response.data
}

export async function addPatient(data: any) {
  await axios.post("/patient/", data)
}

export async function deletePatient(id: number) {
  return await axios.delete(`/patient/${id}`)
}

export async function updatePatient(id: number, patient: any) {
  return await axios.patch(`/patient/${id}`, patient)
}

export async function getPatientById(id: Number) {
  return await axios.get<Patient>(`/patient/${id}`)
}
