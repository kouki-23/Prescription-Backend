import { Router } from "express"
import { validateRequestParams } from "../Middlewares/validation/validation"
import { IdParamsSchema } from "../Middlewares/validation/schema"
import { getProductsOfMoleculeHandler } from "../Handlers/product"

const router = Router()

router.get(
  "/molecule/:id",
  validateRequestParams(IdParamsSchema),
  getProductsOfMoleculeHandler,
)

export default router
