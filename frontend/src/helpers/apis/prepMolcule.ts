import { PrepMolecule } from "@helpers/types"
import axios from "axios"

//prepMolecules should have id
export function updatePrepMolecules(prepMolecules: any) {
  return axios.patch("/prep/many", prepMolecules)
}

export function getAllValidPrepMolecules() {
  return axios.get<PrepMolecule[]>("/prep/valid")
}

export function getPrepMoleculeById(id: number) {
  return axios.get<PrepMolecule>(`/prep/${id}`)
}

export function adjustPrepMolecule(id: number, data: any) {
  return axios.post(`/prep/${id}/adjust`, data)
}

export function libratePrepMolecule(id: number) {
  return axios.post(`/prep/${id}/librate`)
}

export function updatePrepMolecule(id: number, prep: any) {
  return axios.post(`/prep/${id}`, prep)
}
