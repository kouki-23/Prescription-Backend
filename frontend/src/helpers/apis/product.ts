import { Product } from "@helpers/types"
import axios from "axios"

export async function getProductsOfMolecule(moleculeId: number) {
  return axios.get<Product[]>(`/product/molecule/${moleculeId}`)
}
