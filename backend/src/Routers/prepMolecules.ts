import { Router } from "express"
import {
  adjustPrepMoleculeHandler,
  getAllValidPrepMoleculesHandler,
  getPrepMoleculeByIdHandler,
  libratePrepMoleculeHandler,
  updatePrepMoleculeHandler,
  updatePrepMoleculesHandler,
} from "../Handlers/prepMolecule"
import { isMedecinOrPharmacien, isPharmacien } from "../Middlewares/auth"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  adjustPrepMoleculeBodySchema,
} from "../Middlewares/validation/schema"

const router = Router()

//TODO : add  schema validation
router.patch("/many", isMedecinOrPharmacien, updatePrepMoleculesHandler)

router.get("/valid", isPharmacien, getAllValidPrepMoleculesHandler)

router.get(
  "/:id",
  validateRequestParams(IdParamsSchema),
  getPrepMoleculeByIdHandler,
)

router.post(
  "/:id/adjust",
  validateRequestParams(IdParamsSchema),
  validateRequestBody(adjustPrepMoleculeBodySchema),
  isPharmacien,
  adjustPrepMoleculeHandler,
)

router.post(
  "/:id/librate",
  validateRequestParams(IdParamsSchema),
  isPharmacien,
  libratePrepMoleculeHandler,
)

router.post(
  "/:id",
  validateRequestParams(IdParamsSchema),
  updatePrepMoleculeHandler,
)

export default router
