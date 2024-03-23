import axios from "axios"

export async function addPrepMoleculeToCure(idCure: number, prepMolecule: any) {
  return axios.patch(`/cure/${idCure}/molecule`, prepMolecule)
}
