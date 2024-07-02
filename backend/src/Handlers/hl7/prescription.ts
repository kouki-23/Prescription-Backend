import { Request,Response,NextFunction } from "express";
import { IdParams } from "../../Middlewares/validation/schema";
import { getPrescriptionById } from "../../Services/prescriptionSevice";
import { HttpError, StatusCode, handleError } from "../../Utils/HttpError";
import { fhirPrescriptionRessource } from "../../Services/hl7/prescription";

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
        return next(handleError(e));
    }
}