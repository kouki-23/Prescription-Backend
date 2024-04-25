import axios from "axios"
import { Molecule } from "@helpers/types"
import { MoleculeForm } from "@pages/Molecule/AddMolecule"

export async function getAllMolecules() {
  const response = await axios.get("/molecule/")
  return response.data as Molecule[]
}

export async function deleteMolecule(id: number) {
  return axios.delete(`molecule/${id}`)
}

export async function addMolecule(molecule: MoleculeForm) {
  return axios.post("molecule", molecule)
}
