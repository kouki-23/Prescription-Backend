import { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  createPatientHandler,
  deletePatientHandler,
  getAllPatientsHandler,
  getPatientByIdHandler,
  updatePatientHandler,
} from "../Handlers/patient"
import {
  IdParamsSchema,
  createPatientBodySchema,
  updatePatientBodySchema,
} from "../Middlewares/validation/schema"
import { isMedecin } from "../Middlewares/auth"

const router = Router()

router.post(
  "/",
  isMedecin,
  validateRequestBody(createPatientBodySchema),
  createPatientHandler,
)
router.get("/", isMedecin, getAllPatientsHandler)
router.get(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  getPatientByIdHandler,
)
router.patch(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  validateRequestBody(updatePatientBodySchema),
  updatePatientHandler,
)
router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  deletePatientHandler,
)

export default router
