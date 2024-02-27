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

export const MoleculeByIdSchema = z.object({
  id: z.string(),
})
export type MoleculeByIdParams = z.infer<typeof MoleculeByIdSchema>

export const UpdateMoleculeBodySchema = z.object({
  name: z.string().optional(),
  dose: z.number().optional(),
  formula: z.string().optional(),
  unite: z.string().optional(),
  prodDay: z.number().optional(),
  way: z.string().optional(),
  perfusionType: z.string().optional(),
  perfusionDuration: z.string().optional(),
  vehicule: z.string().optional(),
  finalVolume: z.number().optional(),
  comment: z.string().optional(),
})
export type UpdateMoleculeBody = z.infer<typeof UpdateMoleculeBodySchema>

export const createProtocolBodySchema = z.object({
  id: z.number(),
  name: z.string(),
  intercure: z.number(),
  nbcures: z.number(),
  details: z.string(),
  indications: z.string(),
  histotype: z.string(),
  iscreated: z.boolean(),
  molecules: z.array(
    z.object({
      moleculeid: z.number(),
      journey: z.number(),
    }),
  ),
})
export type CreateProtocolBody = z.infer<typeof createProtocolBodySchema>

export const ProtocolByIdSchema = z.object({
  id: z.string(),
})
export type ProtocolByIdParams = z.infer<typeof ProtocolByIdSchema>
