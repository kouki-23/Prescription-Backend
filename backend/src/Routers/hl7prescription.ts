
import { Router } from 'express';
import { createPrescriptionHandler, getPrescriptionByIdHandler } from '../Handlers/hl7/prescription';
import { validateRequestBody, validateRequestParams } from '../Middlewares/validation/validation';
import { createPrescriptionBodySchema, IdParamsSchema } from '../Middlewares/validation/schema';

const router = Router();

router.get(
    "/:id",
    validateRequestParams(IdParamsSchema),
    getPrescriptionByIdHandler,
  )

  
router.post(
  "/",
  validateRequestBody(createPrescriptionBodySchema),
  createPrescriptionHandler,
)

 
export default router;
