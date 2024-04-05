import { Router } from "express"
import { updatePrepMoleculesHandler } from "../Handlers/prepMolecule"
import { isMedecinOrPharmacien } from "../Middlewares/auth"

const router = Router()

//TODO : add  schema validation
router.patch("/many", isMedecinOrPharmacien, updatePrepMoleculesHandler)

export default router
