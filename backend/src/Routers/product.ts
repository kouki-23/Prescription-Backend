import { Router } from "express"
import { isAdmin } from "../Middlewares/auth"
import {
  validateRequestBody,
  validateRequestParams,
} from "../Middlewares/validation/validation"
import {
  IdParamsSchema,
  createProductBodySchema,
} from "../Middlewares/validation/schema"
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
} from "../Handlers/product"
import { getProductsOfMoleculeHandler } from "../Handlers/product"

const router = Router()

router.post(
  "/",
  isAdmin,
  validateRequestBody(createProductBodySchema),
  createProductHandler,
)

router.get("/", getAllProductsHandler)
router.get("/:id", getProductByIdHandler)

router.delete(
  "/:id",
  isAdmin,
  validateRequestParams(IdParamsSchema),
  deleteProductHandler,
)

router.get(
  "/molecule/:id",
  validateRequestParams(IdParamsSchema),
  getProductsOfMoleculeHandler,
)

export default router
