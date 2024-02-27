import { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  ProtocolByIdSchema,
  createProtocolBodySchema,
} from "../Middlewares/validation/schema"
import { isMedecin } from "../Middlewares/auth"
import {
  CreateProtocolHandler,
  deleteProtocolHandler,
  getAllprotocolsHandler,
} from "../Handlers/protocol"
const router = Router()
router.get("/", isMedecin, getAllprotocolsHandler)

router.post(
  "/",
  isMedecin,
  validateRequestBody(createProtocolBodySchema),
  CreateProtocolHandler,
)

router.delete(
  "/:id",
  isMedecin,
  validateRequestParams(ProtocolByIdSchema),
  deleteProtocolHandler,
)
export default router
