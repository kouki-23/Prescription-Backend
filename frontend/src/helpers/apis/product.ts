import axios from "axios"
import { Product } from "@helpers/types"
export async function getAllProducts() {
  const response = await axios.get<Product[]>("/product/")
  return response.data
}
export async function addProduct(data: any) {
  await axios.post("/product/", data)
}
export async function deleteProduct(id: number) {
  await axios.delete(`/product/${id}`)
}
