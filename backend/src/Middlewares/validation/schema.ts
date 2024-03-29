import { number, z } from "zod"

export const loginBodySchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})
export type LoginBody = z.infer<typeof loginBodySchema>

export const IdParamsSchema = z.object({
  id: z.string(),
})
export type IdParams = z.infer<typeof IdParamsSchema>

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
  DMI: z.string(),
  index: z.string(),
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

export const updatePatientBodySchema = z.object({
  DMI: z.string().optional(),
  index: z.string().optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  gender: z.string().min(1).max(20).optional(),
  matrimonial: z.string().min(1).max(50).optional(),
  birthDate: z.string().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  FEVG: z.number().positive().optional(),
  bodySurface: z.number().positive().optional(),
  creatinine: z.number().nonnegative().optional(),
  clairanceFormula: z.string().optional(),
  clairance: z.number().optional(),
  comment: z.string().optional(),
  serviceType: z.string().optional(),
})
export type UpdatePatientBody = z.infer<typeof updatePatientBodySchema>

export const createMoleculeBodySchema = z.object({
  name: z.string(),
  way: z.string(),
  perfusionType: z.string(),
  comment: z.string().optional(),
})
export type CreateMoleculeBody = z.infer<typeof createMoleculeBodySchema>

export const UpdateMoleculeBodySchema = z.object({
  name: z.string().optional(),
  way: z.string().optional(),
  perfusionType: z.string().optional(),
  comment: z.string().optional(),
})
export type UpdateMoleculeBody = z.infer<typeof UpdateMoleculeBodySchema>

export const createProtocolBodySchema = z.object({
  name: z.string(),
  intercure: z.number(),
  nbCures: z.number(),
  details: z.string(),
  indications: z.string(),
  histoType: z.string(),
  molecules: z.array(
    z.object({
      moleculeId: z.number().positive(),
      days: z.array(z.number().positive()),
      unite: z.string(),
      dose: z.number(),
      perfusionType: z.string(),
    }),
  ),
})
export type CreateProtocolBody = z.infer<typeof createProtocolBodySchema>

export const createPrescriptionBodySchema = z.object({
  prescriber: z.string(),
  nbCures: z.number().positive(),
  startDate: z.string(),
  clinicalTest: z.boolean(),
  comment: z.string().optional(),
  serviceType: z.string(),
  patientId: z.number(),
  protocolId: z.number(),
  primitif: z.string(),
  histoType: z.string(),
})

export type CreatePrescriptionBody = z.infer<
  typeof createPrescriptionBodySchema
>
