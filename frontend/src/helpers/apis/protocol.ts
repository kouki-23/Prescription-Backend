import { Protocol } from "@helpers/types"
import { TProtocol } from "@pages/Protocol/AddProtocol"
import axios from "axios"

export async function getAllProtocols() {
  return axios.get<Protocol[]>("/protocol")
}

export async function getProtocolWithMolecules(id: number) {
  return axios.get(`/protocol/${id}`)
}

export async function addProtocol(protocol: TProtocol) {
  return axios.post("/protocol", protocol)
}

export async function deleteProtocol(id: number) {
  return axios.delete(`/protocol/${id}`)
}
