import { Router } from "express"
import {
  addPrepMoleculeToCureHandler,
  updateCureHandler,
} from "../Handlers/cure"

const router = Router()

router.patch("/:id", updateCureHandler)

router.patch("/:id/molecule", addPrepMoleculeToCureHandler)

export default router
