import { useAuth } from "@helpers/auth/auth"
import { User } from "@helpers/types"
import { UserForm } from "@pages/User/AddUser"
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

export async function getAllUsers() {
  return await axios.get<User[]>("user")
}

export async function deleteUser(id: number) {
  return await axios.delete(`user/${id}`)
}

export async function addUser(user: UserForm) {
  return await axios.post("user", user)
}
