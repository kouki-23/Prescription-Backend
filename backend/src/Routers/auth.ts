import { Router } from "express"
import { loginHandler, refreshTokenHandler } from "../Handlers/auth"
import { validateRequestBody } from "../Middlewares/validation/validation"
import { loginBodySchema } from "../Middlewares/validation/schema"

const router = Router()

router.post("/login", validateRequestBody(loginBodySchema), loginHandler)
router.get("/refresh", refreshTokenHandler)

export default router
