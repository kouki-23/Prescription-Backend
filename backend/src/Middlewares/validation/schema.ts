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

export const PatientByIdParamsSchema = z.object({
  id: z.string(),
})

export type PatientByIdParams = z.infer<typeof PatientByIdParamsSchema>

export const updatePatientBodySchema = z.object({
  DMI: z.number().optional(),
  index: z.number().optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  gender: z.string().min(1).max(20).optional(),
  matrimonial: z.string().min(1).max(50).optional(),
  birthDate: z.string().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  bodySurface: z.number().positive().optional(),
  creatinine: z.number().nonnegative().optional(),
  clairanceFormula: z.string().optional(),
  clairance: z.number().optional(),
  comment: z.string().optional().optional(),
  serviceType: z.string().optional().optional(),
})

export type UpdatePatientBody = z.infer<typeof updatePatientBodySchema>

export const createMoleculeBodySchema = z.object({
  name: z.string(),
  dose: z.number(),
  formula: z.string(),
  unite: z.string(),
  prodDay: z.number(),
  way: z.string(),
  perfusionType: z.string(),
  perfusionDuration: z.string(),
  vehicule: z.string(),
  finalVolume: z.number(),
  comment: z.string().optional(),
})

export type CreateMoleculeBody = z.infer<typeof createMoleculeBodySchema>
