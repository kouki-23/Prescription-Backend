import { Router } from "express"
import { getAllVehiculesHandler } from "../Handlers/vehicule"

const router = Router()

router.get("/", getAllVehiculesHandler)

export default router
