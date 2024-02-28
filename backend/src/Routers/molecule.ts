import { Router } from "express"
import { isAdmin, isMedecin } from "../Middlewares/auth"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  MoleculeByIdSchema,
  UpdateMoleculeBodySchema,
  createMoleculeBodySchema,
} from "../Middlewares/validation/schema"
import {
  DeleteMoleculeHandler,
  UpdateMoleculeBodyHandler,
  createMoleculeHandler,
  getAllMoleculesHandler,
  getMoleculeByIdHandler,
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
  validateRequestParams(MoleculeByIdSchema),
  getMoleculeByIdHandler,
)

router.patch(
  "/:id",
  isMedecin,
  validateRequestParams(MoleculeByIdSchema),
  validateRequestBody(UpdateMoleculeBodySchema),
  UpdateMoleculeBodyHandler,
)

router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(MoleculeByIdSchema),
  DeleteMoleculeHandler,
)

export default router
