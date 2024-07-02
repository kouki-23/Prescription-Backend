
import { Router } from 'express';
import { getPrescriptionByIdHandler } from '../Handlers/hl7/prescription';
import { validateRequestParams } from '../Middlewares/validation/validation';
import { IdParamsSchema } from '../Middlewares/validation/schema';

const router = Router();

//router.get(
  //  "/:id",
    //validateRequestParams(IdParamsSchema),
   // getPrescriptionByIdHandler,
  //)

 

// Define the GET route
router.get('/:id', getPrescriptionByIdHandler);



export default router;
