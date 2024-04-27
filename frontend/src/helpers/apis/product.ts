import axios from "axios"
import { Product } from "@helpers/types"
import { ProductForm } from "@pages/Speciality/AddSpeciality"
export async function getAllProducts() {
  const response = await axios.get<Product[]>("/product/")
  return response.data
}

export async function getProductById(id: number) {
  return axios.get<Product>(`/product/${id}`)
}
export async function addProduct(data: ProductForm) {
  await axios.post("/product/", data)
}
export async function deleteProduct(id: number) {
  await axios.delete(`/product/${id}`)
}

export async function getProductsOfMolecule(moleculeId: number) {
  return axios.get<Product[]>(`/product/molecule/${moleculeId}`)
}
