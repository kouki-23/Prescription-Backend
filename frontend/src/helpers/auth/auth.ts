import { createContext, useContext } from "react"

export type User = {
  id: number
  name: string
  username: string
  role: string
}

export type AuthData = {
  loading: boolean
  user: User | undefined
  token: string
  login: (user: User, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthData | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw "useAuth must be used within an AuthProvider"
  }
  return context
}

export function isAboutToExpired(token: string) {
  let payload = JSON.parse(atob(token.split(".")[1]))
  let exp = payload.exp * 1000
  const current = Date.now()
  const buffer = 60 * 1000 * 5 // 5 min
  return exp - current < buffer
}
