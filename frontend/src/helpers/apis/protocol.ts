import axios from "axios"

export async function getAllProtocols() {
  return axios.get("/protocol")
}
