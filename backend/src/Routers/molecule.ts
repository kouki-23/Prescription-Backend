import { Router } from "express"
import { isAdmin, isMedecin } from "../Middlewares/auth"
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
  isAdmin,
  validateRequestBody(createMoleculeBodySchema),
  createMoleculeHandler,
)

router.get("/", getAllMoleculesHandler)

router.get(
  "/:id",
  validateRequestParams(IdParamsSchema),
  getMoleculeByIdHandler,
)

router.patch(
  "/:id",
  isAdmin,
  validateRequestParams(IdParamsSchema),
  validateRequestBody(UpdateMoleculeBodySchema),
  updateMoleculeHandler,
)

router.delete(
  "/:id",
  isAdmin,
  validateRequestParams(IdParamsSchema),
  deleteMoleculeHandler,
)

export default router
