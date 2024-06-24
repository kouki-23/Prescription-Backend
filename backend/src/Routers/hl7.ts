import { Router } from "express"
import { getAllPatientsHandler } from "../Handlers/hl7/patient"
const router = Router()


router.get('/',getAllPatientsHandler)

export default router