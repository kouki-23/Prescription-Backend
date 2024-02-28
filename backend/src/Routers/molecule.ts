import { Router } from "express"
import { isMedecin } from "../Middlewares/auth"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  UpdateMoleculeBodySchema,
  createMoleculeBodySchema,
} from "../Middlewares/validation/schema"
import {
  createMoleculeHandler,
  deleteMoleculeHandler,
  getAllMoleculesHandler,
  getMoleculeByIdHandler,
  updateMoleculeHandler,
} from "../Handlers/molecule"

const router = Router()

router.post(
  "/",
  isMedecin,
  validateRequestBody(createMoleculeBodySchema),
  createMoleculeHandler,
)
router.get("/", getAllMoleculesHandler)

router.get(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  getMoleculeByIdHandler,
)

router.patch(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  validateRequestBody(UpdateMoleculeBodySchema),
  updateMoleculeHandler,
)

router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  deleteMoleculeHandler,
)

export default router
