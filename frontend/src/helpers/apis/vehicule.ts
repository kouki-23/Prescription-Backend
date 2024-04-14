import { Vehicule } from "@helpers/types"
import axios from "axios"

export async function getAllVehicules() {
  return axios.get<Vehicule[]>("/vehicule")
}
