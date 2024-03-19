import axios from "axios"

//prepMolecules should have id
export function updatePrepMolecules(prepMolecules: any) {
  return axios.patch("/prep/many", prepMolecules)
}
