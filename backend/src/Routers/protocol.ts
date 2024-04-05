import { Router } from "express"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  createProtocolBodySchema,
} from "../Middlewares/validation/schema"
import { isAdmin } from "../Middlewares/auth"
import {
  createProtocolHandler,
  deleteProtocolHandler,
  getAllProtocolsHandler,
  getProtocolWithMoleculesHandler,
} from "../Handlers/protocol"
const router = Router()

router.get("/", getAllProtocolsHandler)

router.get("/:id", getProtocolWithMoleculesHandler)

router.post(
  "/",
  isAdmin,
  validateRequestBody(createProtocolBodySchema),
  createProtocolHandler,
)

router.delete(
  "/:id",
  isAdmin,
  validateRequestParams(IdParamsSchema),
  deleteProtocolHandler,
)

export default router
