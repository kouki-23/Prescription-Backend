import e, { Router } from "express"
import { validateRequestBody } from "../Middlewares/validation/validation"
import { createPrescriptionBodySchema } from "../Middlewares/validation/schema"
import { createPrescriptionHandler } from "../Handlers/prescription"

const router = Router()

router.post(
  "/",
  validateRequestBody(createPrescriptionBodySchema),
  createPrescriptionHandler,
)

export default router
