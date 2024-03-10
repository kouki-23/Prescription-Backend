import axios, { AxiosError } from "axios"

export function globalDefault() {
  axios.defaults.baseURL = "http://127.0.0.1:3006"
  axios.defaults.headers.common["Content-Type"] = "application/json"
}

export function handleError(e: unknown) {
  if (e instanceof AxiosError && e.response?.data.message) {
    return e.response?.data.message
  } else {
    return "Desole"
  }
}
