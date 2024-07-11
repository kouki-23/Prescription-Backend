import { Request,Response,NextFunction } from "express";
import { CreatePrescriptionBody, IdParams } from "../../Middlewares/validation/schema";
import { createPrescrptition, getPrescriptionById } from "../../Services/prescriptionSevice";
import { HttpError, StatusCode, handleError } from "../../Utils/HttpError";
import { createPrescription, fhirPrescriptionRessource } from "../../Services/hl7/prescription";
import { Cure } from "../../Entities/Cure";


export async function getPrescriptionByIdHandler(
    req: Request<IdParams, never, never, never>,
    res:  Response,
    next: NextFunction,
){
    const { id } = req.params;
    try{
        const prescription = await getPrescriptionById(Number(id)); 
        if(!prescription) {
            return next(new HttpError("INVALID ID", StatusCode.NotFound));
        }
        const fhirprescription = fhirPrescriptionRessource(prescription);
        return res.json(fhirprescription);

    }catch(e) {
        console.log(e)
        return next(handleError(e));
    }
}



export async function createPrescriptionHandler(
    req: Request<never, never, CreatePrescriptionBody, never>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const prescriptionData: CreatePrescriptionBody = req.body;
  
      await createPrescrptition(prescriptionData);
  
      res.sendStatus(200);
    } catch (e) {
      const errorOutcome = handleError(e);
      res.status(400).json(errorOutcome);
    }
  }
