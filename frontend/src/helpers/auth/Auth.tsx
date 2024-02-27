import { useEffect, useMemo, useState } from "react"
import { User, isAboutToExpired, useAuth } from "./auth"
import { Navigate, Outlet } from "react-router-dom"
import { fetchAccessToken } from "@helpers/apis/user"
import { AuthContext } from "./auth"
import LoadingInterface from "@components/organisms/LoadingInterface"
import axios from "axios"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !token) {
      const userLocalStorage = localStorage.getItem("user")
      const tokenLocalStorage = localStorage.getItem("access-token")
      if (userLocalStorage && tokenLocalStorage) {
        setUser(JSON.parse(userLocalStorage))
        setToken(tokenLocalStorage)
      }
    }
    setLoading(false)
  }, [])
  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    }
  }, [token])

  const login = (user: User, token: string) => {
    // insecure way to store jwt token
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("access-token", token)
    setUser(user)
    setToken(token)
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
  }
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("access-token")
    setUser(undefined)
    setToken("")
    axios.defaults.headers.common = { Authorization: null }
  }

  const value = useMemo(
    () => ({
      loading,
      user,
      token,
      login,
      logout,
    }),
    [user, token, loading],
  )
  if (loading) return <LoadingInterface />

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthGuard({
  role,
}: {
  role?: "admin" | "medecin" | "pharmacien"
}) {
  const { user, token, loading } = useAuth()
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null)
  useEffect(() => {
    async function checkValid() {
      try {
        if (user && token) {
          if (isAboutToExpired(token)) {
            await fetchAccessToken()
          }
          if (role) {
            if (role === user.role) {
              setIsAllowed(true)
            } else {
              setIsAllowed(false)
            }
          } else {
            setIsAllowed(true)
          }
        } else {
          setIsAllowed(false)
        }
      } catch (error) {
        setIsAllowed(false)
      }
    }
    checkValid()
  }, [user, token])
  if (isAllowed === null || loading) return <LoadingInterface />

  if (isAllowed) {
    return <Outlet />
  }
  return <Navigate to="/login" />
}
