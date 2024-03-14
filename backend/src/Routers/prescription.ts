import { Router } from "express"
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
  getPrescriptionByIdHandler,
  getPrescriptionsWithEverythingByPatientIdHandler,
} from "../Handlers/prescription"
import { getPrescriptionById } from "../Services/prescriptionSevice"

const router = Router()

router.post(
  "/",
  validateRequestBody(createPrescriptionBodySchema),
  createPrescriptionHandler,
)

router.get(
  "/:id",
  validateRequestParams(IdParamsSchema),
  getPrescriptionByIdHandler,
)

router.get(
  "/patient/:id",
  validateRequestParams(IdParamsSchema),
  getPrescriptionsWithEverythingByPatientIdHandler,
)

export default router
