import { Router } from "express"
import { loginHandler, refreshTokenHandler } from "../Handlers/auth"
import { validateRequestBody } from "../Middlewares/validation/validation"
import {
  loginBodySchema,
  refreshTokenBodySchema,
} from "../Middlewares/validation/schema"

const router = Router()

router.post("/login", validateRequestBody(loginBodySchema), loginHandler)
router.post(
  "/refresh",
  validateRequestBody(refreshTokenBodySchema),
  refreshTokenHandler,
)

export default router
