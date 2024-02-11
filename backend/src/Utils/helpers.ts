export function getSecretJWT(): string {
  return process.env.SECRET_KEY || "secret"
}
