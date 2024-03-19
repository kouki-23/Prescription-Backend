import { Router } from "express"
import { updateCureHandler } from "../Handlers/cure"

const router = Router()

router.patch("/:id", updateCureHandler)

export default router
