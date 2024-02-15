import jwt from "jsonwebtoken"

export function getSecretJWT() {
  return process.env.SECRET_KEY || "secret"
}

export function verifyJWT(token: string) {
  return jwt.verify(token, getSecretJWT()) as jwt.JwtPayload
}
