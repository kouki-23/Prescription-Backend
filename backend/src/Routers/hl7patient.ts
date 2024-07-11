import { Router } from "express"
import { createPatientHandler, getAllPatientsHandler, getPatientByIdHandler } from "../Handlers/hl7/patient"
import { validateRequestBody, validateRequestParams } from "../Middlewares/validation/validation"
import { IdParamsSchema, createPatientBodySchema } from "../Middlewares/validation/schema"
import { isMedecin } from "../Middlewares/auth"

const router = Router()


router.get('/',getAllPatientsHandler)

router.get("/:id", validateRequestParams(IdParamsSchema), getPatientByIdHandler)

router.post(
    "/",
    isMedecin,
    validateRequestBody(createPatientBodySchema),
    createPatientHandler,
  )


export default router