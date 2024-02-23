import { z } from "zod"

export const loginBodySchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})
export type LoginBody = z.infer<typeof loginBodySchema>

const UserRole = z.enum(["admin", "medecin", "pharmacien"])

export const createUserSchemaBody = z.object({
  name: z.string().min(3).max(15),
  username: z.string().min(3).max(15),
  password: z.string().min(3).max(15),
  role: UserRole,
  serviceType: z.string().optional(),
})

export type CreateUserBody = z.infer<typeof createUserSchemaBody>

export const createPatientBodySchema = z.object({
  DMI: z.number(),
  index: z.number(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  gender: z.string().min(1).max(20),
  matrimonial: z.string().min(1).max(50),
  birthDate: z.string(),
  weight: z.number().positive(),
  height: z.number().positive(),
  bodySurface: z.number().positive(),
  creatinine: z.number().nonnegative(),
  clairanceFormula: z.string().min(1).max(255),
  clairance: z.number(),
  comment: z.string().optional(),
  serviceType: z.string().optional(),
})

export type CreatePatientBody = z.infer<typeof createPatientBodySchema>

export const getPatientByIdParamsSchema = z.object({
  id: z.number(),
})

export type getPatientByIdParams = z.infer<typeof getPatientByIdParamsSchema>
