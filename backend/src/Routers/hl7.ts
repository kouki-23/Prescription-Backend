import { Router } from "express"
import { getAllPatientsHandler } from "../Handlers/hl7/patient"
import { getPrescriptionByIdHandler } from "../Handlers/hl7/prescription"    
import { validateRequestParams } from "../Middlewares/validation/validation"
import { IdParamsSchema } from "../Middlewares/validation/schema"

const router = Router()


router.get('/',getAllPatientsHandler)
router.get(
    "/:id",
    validateRequestParams(IdParamsSchema),
    getPrescriptionByIdHandler,
  )

export default router