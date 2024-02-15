import { z } from "zod"

export const loginBodySchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})
export type LoginBody = z.infer<typeof loginBodySchema>

export const refreshTokenBodySchema = z.object({
  token: z.string(),
})
export type refreshTokenBody = z.infer<typeof refreshTokenBodySchema>
