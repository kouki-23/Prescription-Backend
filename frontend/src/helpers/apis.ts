import axios from "axios"
import { useAuth } from "./auth/auth"

const BASE_URL = "http://localhost:5000/"

export function login(username: string, password: string) {
  return axios.post(
    BASE_URL + "auth/login",
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export async function fetchAccessToken() {
  try {
    const response = await axios.get(BASE_URL + "/auth/refresh")
    const token = response.data.accessToken
    const { user, login } = useAuth()
    if (user) {
      login(user, token)
    }
  } catch {
    throw "unauthrozid"
  }
}
