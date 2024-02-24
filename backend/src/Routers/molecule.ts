import { Router } from "express"
import { isAdmin, isMedecin } from "../Middlewares/auth"
import { validateRequestBody } from "../Middlewares/validation/validation"
import { createMoleculeBodySchema } from "../Middlewares/validation/schema"
import {
  createMoleculeHandler,
  getAllMoleculesHandler,
} from "../Handlers/molecule"

const router = Router()

router.post(
  "/",
  isMedecin,
  validateRequestBody(createMoleculeBodySchema),
  createMoleculeHandler,
)
router.get("/", getAllMoleculesHandler)

export default router
