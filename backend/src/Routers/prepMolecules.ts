import { Router } from "express"
import { updatePrepMoleculesHandler } from "../Handlers/prepMolecule"

const router = Router()

router.patch("/many", updatePrepMoleculesHandler)

export default router
