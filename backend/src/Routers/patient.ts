import { Router } from "express"
import { validateRequestBody } from "../Middlewares/validation/validation"
import {
  createPatientHandler,
  getAllPatientsHandler,
  getPatientByIdHandler,
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
router.get("/", isMedecin, getAllPatientsHandler)
router.get("/:id", isMedecin, getPatientByIdHandler)
export default router
