import axios from "axios"
import { Patient } from "@helpers/types"

export async function getAllPatients() {
  const response = await axios.get("/patient/")
  return response.data as Patient[]
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
