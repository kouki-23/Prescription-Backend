import { Router } from "express"
import { createUserSchemaBody } from "../Middlewares/validation/schema"
import { validateRequestBody } from "../Middlewares/validation/validation"
import { createUserHandler } from "../Handlers/user"
import { isAdmin } from "../Middlewares/auth"

const router = Router()

router.post(
  "/",
  isAdmin,
  validateRequestBody(createUserSchemaBody),
  createUserHandler,
)

export default router
