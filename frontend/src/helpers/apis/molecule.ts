import axios from "axios"
import { Molecule } from "@helpers/types"

export async function getAllMolecules() {
  const response = await axios.get("/molecule/")
  return response.data as Molecule[]
}
