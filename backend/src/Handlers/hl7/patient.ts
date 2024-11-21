import { Request, Response, NextFunction } from 'express';
import { createPatient, getAllPatients, getPatientById } from '../../Services/patientService'; 
import { fhirPatientResource } from '../../Services/hl7/patient'; 
import { HttpError, StatusCode, handleError } from '../../Utils/HttpError'; 
import { CreatePatientBody } from '../../Middlewares/validation/schema';

export async function getAllPatientsHandler(
  req: Request<never, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const patients = await getAllPatients();
    const fhirPatients = patients.map(fhirPatientResource); // Convert each patient to FHIR format
    res.json({ resourceType: 'Bundle', type: 'collection', entry: fhirPatients.map(patient => ({ resource: patient })) });
  } catch (e) {
    return next(
      new HttpError("Cannot get patients", StatusCode.InternalServerError),
    );
  }
}
   
export async function getPatientByIdHandler
(req: Request<{id: string}, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  try{
    const patient = await getPatientById(Number(id));
    const fhirPatient = fhirPatientResource(patient); // Convert patient to FHIR format
    res.json(fhirPatient);
  }catch (e){
    next(handleError(e));
  }
  
}

export async function createPatientHandler(
  req: Request<never, never, CreatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  try{
    
    if(!req.user) {
      throw new Error("");
    }
    const fhirPatient = fhirPatientResource(req.params);
    await createPatient(fhirPatient,req.user.id);
    res.sendStatus(200);
  }catch(e){
    return next(handleError(e));
  }
  
}