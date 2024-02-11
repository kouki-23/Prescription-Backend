import { Router } from "express"
import { loginHandler } from "../Handlers/auth"
import { validateRequestBody } from "../Middlewares/validation/validation"
import { loginBodySchema } from "../Middlewares/validation/schema"

const router = Router()

router.post("/login", validateRequestBody(loginBodySchema), loginHandler)

export default router
