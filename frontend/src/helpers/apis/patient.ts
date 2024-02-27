import axios from "axios"
import { Patient } from "../../types/patient"

export async function getAllPatients() {
  const response = await axios.get("/patient/")
  return response.data as Patient[]
}

export async function addPatient(data: any) {
  await axios.post("/patient/", data)
}
