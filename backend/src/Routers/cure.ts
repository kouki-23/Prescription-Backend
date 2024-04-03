import { Router } from "express"
import {
  addPrepMoleculeToCureHandler,
  deleteCureHandler,
  updateCureHandler,
} from "../Handlers/cure"

const router = Router()

router.patch("/:id", updateCureHandler)

router.patch("/:id/molecule", addPrepMoleculeToCureHandler)

router.delete("/:id", deleteCureHandler)

export default router
