import axios from "axios"
import { useAuth } from "./auth/auth"
import { Patient } from "../types/patient"

export function globalDefault() {
  axios.defaults.baseURL = "http://localhost:5000/"
  axios.defaults.headers.common["Content-Type"] = "application/json"
}

export function login(username: string, password: string) {
  return axios.post("auth/login", {
    username,
    password,
  })
}

export async function fetchAccessToken() {
  try {
    const response = await axios.get("auth/refresh", {
      withCredentials: true,
    })
    const token = response.data.accessToken
    const { user, login } = useAuth()
    if (user) {
      login(user, token)
    }
  } catch {
    throw "unauthrozid"
  }
}

export async function getAllPatients() {
  try {
    const response = await axios.get("/patient/")
    return response.data as Patient[]
  } catch (e) {
    console.error(e)
  }
}
