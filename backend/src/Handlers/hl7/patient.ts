import { Request, Response, NextFunction } from 'express';
import { getAllPatients } from '../../Services/patientService'; 
import { fhirPatientResource } from '../../Utils/fhirutils'; 
import { HttpError, StatusCode } from '../../Utils/HttpError'; 

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
