import { Router } from "express"
import {
  addPrepMoleculeToCureHandler,
  deleteCureHandler,
} from "../Handlers/cure"
import { isMedecin } from "../Middlewares/auth"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  addPrepMoleculeToCureBodySchema,
} from "../Middlewares/validation/schema"

const router = Router()

//TODO : add body validation
router.patch(
  "/:id/molecule",
  validateRequestParams(IdParamsSchema),
  validateRequestBody(addPrepMoleculeToCureBodySchema),
  isMedecin,
  addPrepMoleculeToCureHandler,
)

router.delete(
  "/:id",
  validateRequestParams(IdParamsSchema),
  isMedecin,
  deleteCureHandler,
)

export default router
