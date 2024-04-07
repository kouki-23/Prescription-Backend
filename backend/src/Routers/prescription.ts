import { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  createPrescriptionBodySchema,
  updateCureStartDateBodySchema,
} from "../Middlewares/validation/schema"
import {
  createPrescriptionHandler,
  deletePrescriptionHandler,
  getPrescriptionByIdHandler,
  getPrescriptionsWithEverythingByPatientIdHandler,
  updateCureStartDateHandler,
  updatePrescriptionHandler,
} from "../Handlers/prescription"
import { isMedecin } from "../Middlewares/auth"

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

//TODO : add body schema validation
router.patch(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  updatePrescriptionHandler,
)

router.patch(
  "/:id/cure/date",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  validateRequestBody(updateCureStartDateBodySchema),
  updateCureStartDateHandler,
)

router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  deletePrescriptionHandler,
)

export default router
