import { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  createProtocolBodySchema,
} from "../Middlewares/validation/schema"
import { isMedecin } from "../Middlewares/auth"
import {
  createProtocolHandler,
  deleteProtocolHandler,
  getAllProtocolsHandler,
  getProtocolWithMoleculesHandler,
} from "../Handlers/protocol"
const router = Router()
router.get("/", isMedecin, getAllProtocolsHandler)
router.get("/:id", isMedecin, getProtocolWithMoleculesHandler)

router.post(
  "/",
  isMedecin,
  validateRequestBody(createProtocolBodySchema),
  createProtocolHandler,
)

router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(IdParamsSchema),
  deleteProtocolHandler,
)
export default router
