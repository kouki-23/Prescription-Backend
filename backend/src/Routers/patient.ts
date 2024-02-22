import { Router } from "express"
import { validateRequestBody } from "../Middlewares/validation/validation"
import {
  GetAllPatientsHandler,
  createPatientHandler,
} from "../Handlers/patient"
import { createPatientBodySchema } from "../Middlewares/validation/schema"
import { isMedecin } from "../Middlewares/auth"

const router = Router()

router.post(
  "/",
  isMedecin,
  validateRequestBody(createPatientBodySchema),
  createPatientHandler,
)
router.get("/", isMedecin, GetAllPatientsHandler)
export default router
