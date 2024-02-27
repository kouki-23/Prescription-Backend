import { useAuth } from "@helpers/auth/auth"
import axios from "axios"

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
