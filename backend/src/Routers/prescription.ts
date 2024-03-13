import e, { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  createPrescriptionBodySchema,
} from "../Middlewares/validation/schema"
import {
  createPrescriptionHandler,
  getPrescriptionWithEverythingByPatientIdHandler,
} from "../Handlers/prescription"

const router = Router()

router.post(
  "/",
  validateRequestBody(createPrescriptionBodySchema),
  createPrescriptionHandler,
)

router.get(
  "/:id",
  validateRequestParams(IdParamsSchema),
  getPrescriptionWithEverythingByPatientIdHandler,
)

export default router
