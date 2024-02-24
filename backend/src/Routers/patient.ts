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
  PatientByIdParamsSchema,
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
  validateRequestParams(PatientByIdParamsSchema),
  getPatientByIdHandler,
)
router.patch(
  "/:id",
  isMedecin,
  validateRequestParams(PatientByIdParamsSchema),
  validateRequestBody(updatePatientBodySchema),
  updatePatientHandler,
)
router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(PatientByIdParamsSchema),
  deletePatientHandler,
)

export default router
